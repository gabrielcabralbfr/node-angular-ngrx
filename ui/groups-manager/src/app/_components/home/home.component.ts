import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';
import { Group } from 'src/app/_models/group.model';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/_state';
import { Store, State } from '@ngrx/store';
import { User } from 'src/app/_models/user.model';
import { MembershipService } from 'src/app/_services/membership/membership.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public groups: Array<Group>;
  public state: any;
  public user: Partial<User>;
  public searchValue: string = ''
  public loading: boolean
  public newGroupName: string = ''
  constructor(private userService: UserService, private store: State<AppState>, private membershipService: MembershipService) {
    this.loading = true
  }

  ngOnInit() {
    const state = this.store.getValue().newAppState
    this.user = state && state.user ? state.user : JSON.parse(sessionStorage.getItem('user'))

    this.userService.getGroups().subscribe(groups => {
      groups.map(group => {
        group.showingMembers = false
        group.isEditing = false
      })

      // Waiting to force loading on screen
      setTimeout(() => {
        this.groups = groups
        this.loading = false
      }, 1000);
    })
  }

  isGroupAdmin(group): boolean {
    return group.admin_id === this.user.id

  }

  isGroupMember(group): boolean {
    let isMember = group.members.filter(member => member.id === this.user.id).length > 0
    return isMember
  }
  showGroupMembers(group): void {
    if (this.isGroupAdmin(group)) group.showingMembers = !group.showingMembers
  }

  removeUserFromGroup(user, group): void {
    this.membershipService.removeGroupMember(user.id, group.id).toPromise()
      .then(response => {
        if (response) {
          group.members.splice(group.members.indexOf(user))
        }
      })
      .catch(error => console.log(error))
  }

  joinGroup(group): void {
    this.membershipService.joinGroup(this.user.id, group.id).toPromise()
      .then(response => {
        console.log(response);

        if (response) {
          group.members.push(this.user)
        }
      })
      .catch(error => console.log(error))
  }
  createGroup(): void {
    console.log(this.newGroupName);
    this.membershipService.createNewGroup(this.newGroupName).toPromise()
      .then(response => {
        console.log(response);
        if (response) {
          response.members = []
          response.members.push(this.user)
          this.groups.push(response)

          $('#groupModal').modal('hide')
        }
      })
      .catch(error => console.log(error))
  }

  toggleEdit(group): void {
    if (this.isGroupAdmin(group)) group.isEditing = !group.isEditing
  }
  updateGroup(group): void {
    console.log(name);
    this.membershipService.updateGroup(group).toPromise()
      .then(response => {
        console.log(response);
        this.toggleEdit(group)
      })
      .catch(error => alert("error"))
  }
}