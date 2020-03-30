import { createAction, props } from '@ngrx/store';
import { User } from '../_models/user.model';

export const fillToken = createAction('FILL_TOKEN', props<{ payload: string }>());
export const fillUser = createAction('FILL_USER', props<{ payload: Partial<User> }>());
export const clearState = createAction('CLEAR_STATE');
