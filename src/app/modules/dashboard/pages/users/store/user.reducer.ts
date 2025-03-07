import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../models';

export const userFeatureKey = 'user';

export interface State {
  users: User[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  users: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(UserActions.loadUsersSuccess, (state, action) => {
    return {
      ...state,
      users: action.data,
      isLoading: false,
      error: null,
    };
  }),
  on(UserActions.loadUsersFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(UserActions.deleteUserById, (state, action) => {
    return {
      ...state,
      users: state.users.filter((user) => user.id !== action.id),
    };
  }),
  on(UserActions.resetState, () => initialState),
  on(UserActions.createUser, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(UserActions.createUserSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      users: [...state.users, action.data],
    };
  }),
  on(UserActions.createUserFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  on(UserActions.deleteUserById, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.deleteUserByIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    error: null,
    users: state.users.filter((user) => user.id !== action.id),
  })),
  on(UserActions.deleteUserByIdFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});
