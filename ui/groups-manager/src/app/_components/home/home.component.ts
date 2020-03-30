import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';
import { Group } from 'src/app/_models/group.model';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/_state';
import { Store, State } from '@ngrx/store';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public groups: Observable<Array<Group>>;
  public state: any;
  public user: Partial<User>;
  public searchValue: string = ''
  constructor(private userService: UserService, private store: State<AppState>) { }

  ngOnInit() {
    console.log(this.store.getValue());

    // this.store.select((state: any) => {

    //   this.state = state.newAppState
    //   this.user = this.state && this.state.user ? this.state.user : JSON.parse(sessionStorage.getItem('user'))
    // }).subscribe()

    const state = this.store.getValue().newAppState
    this.user = state && state.user ? state.user : JSON.parse(sessionStorage.getItem('user'))

    this.groups = this.userService.getGroups()
  }
  handleKeyUp(event: any) {
    console.log(this.searchValue);
    

  }

  isGroupAdmin(group): boolean {
    return group.admin_id === this.user.id

  }

  isGroupMember(group): boolean {
    let isMember = group.members.filter(member => member.id === this.user.id).length > 0
    return isMember
  }

}
