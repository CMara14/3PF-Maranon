import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectIsLoadingUsers = createSelector(
  selectUserState,
  (state) => state.isLoading
);

export const selectErrorUsers = createSelector(
  selectUserState,
  (state) => state.error
);

