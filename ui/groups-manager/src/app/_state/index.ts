import { User } from '../_models/user.model';
import { Group } from '../_models/group.model';
import { Membership } from '../_models/membership.model';

export interface AppState {
    user: User
    groups: Array<Group>
    memberships: Array<Membership>
    loading: boolean
    token: string

}

export const appState = (state: AppState) => state