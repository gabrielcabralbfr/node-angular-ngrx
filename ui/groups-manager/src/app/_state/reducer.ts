import { AppState } from '.';
import { Action } from '@ngrx/store';

export const initialState: AppState = {
    user: null,
    groups: [],
    loading: false,
    token: null,
    memberships: []

}
export function reducer(state: AppState, action: any) {
    switch (action.type) {
        case 'FILL_TOKEN':
            return { ...state, token: action.payload }
        case 'FILL_USER':
            return { ...state, user: action.payload }
        case 'CLEAR_STATE':
            return { }

        default:
            return state
    }

}