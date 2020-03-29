import { createAction, props } from '@ngrx/store';

export const fillToken = createAction('FILL_TOKEN', props<{ payload: string }>());
