import { Pipe, PipeTransform } from '@angular/core';
import { State } from '@ngrx/store';
import { AppState } from 'src/app/_state';

@Pipe({
  name: 'filterGroups'
})
export class FilterGroupsPipe implements PipeTransform {

  constructor(private state: State<AppState>) {}

  transform(groups: any, ...args: any[]): any {
    if (!groups) return

    const state = this.state.getValue().newAppState
    const user = state && state.user ? state.user : JSON.parse(sessionStorage.getItem('user'))

    const hasOwnedArgument = args.includes('owned')
    const hasJoinedArgument = args.includes('joined')
    const hasNotJoinedArgument = args.includes('notJoined')

    if (hasOwnedArgument) {
      return groups.filter(group => group.admin_id === user.id)
    }

    if (hasJoinedArgument) {
      return groups.filter(group => {
        // console.log("INCLUI?", group.members.includes(user));
        let isNotAdmin = group.admin_id !== user.id
        let isAMember = group.members.filter(member => member.id === user.id).length > 0
        return isNotAdmin && isAMember
      })
    }

    if (hasNotJoinedArgument) {
      return groups.filter(group => {
        let isNotAdmin = group.admin_id !== user.id
        let isNotAMember = group.members.filter(member => member.id === user.id).length <= 0
        return isNotAdmin && isNotAMember
      })
    }

    return groups
  }
}