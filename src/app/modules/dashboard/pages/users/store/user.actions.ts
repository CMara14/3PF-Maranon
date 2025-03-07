import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: User[] }>(),
    'Load Users Failure': props<{ error: unknown }>(),

    'Create User': props<{ data: Omit<User, 'id'> }>(),
    'Create User Success': props<{ data: User }>(),
    'Create User Failure': props<{ error: unknown }>(),

    'Delete User By Id': props<{ id: string }>(),
    'Delete User By Id Success': props<{ id: string }>(),
    'Delete User By Id Failure': props<{ error: unknown }>(),

    'Reset State': emptyProps(),
  },
});
