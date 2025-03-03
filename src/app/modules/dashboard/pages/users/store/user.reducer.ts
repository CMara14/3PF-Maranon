import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../models';

export const userFeatureKey = 'user';

export interface State {
  users: User[];
}

export const initialState: State = {
  users: [],
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => {
    return {
      ...state,
      users: [
        {
          id: 'asdas',
          name: 'asdas',
          accessToken: 'asdasdas',
          email: 'email@mail.com',
          password: '123456',
          role: 'ADMIN',
        },
        {
          id: 'asda2s',
          name: 'asda23s',
          accessToken: 'asdasdas',
          email: 'email2@mail.com',
          password: '123456',
          role: 'ADMIN',
        },
      ],
    };
  }),
  on(UserActions.deleteUserById, (state, action) => {
    return {
      // Un nuevo estado en el cual debemos eliminar el usuario con id que recibimos en la accion
      ...state,
      users: state.users.filter((user) => user.id !== action.id),
    };
  }),
  on(UserActions.resetState, () => initialState)
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});
