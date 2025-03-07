import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { UserActions } from './user.actions';
import { UsersService } from '../../../../../core/services/users.service';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      concatMap(() =>
        this.usersService.getUsers().pipe(
          map((users) =>
            UserActions.loadUsersSuccess({ data: users })
          ),
          catchError((error) =>
            of(UserActions.loadUsersFailure({ error }))
          )
        )
      )
    );
  });

    createUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.createUser),
        concatMap((action) =>
          this.usersService.createUser(action.data).pipe(
            map((user) =>
              UserActions.createUserSuccess({ data: user })
            ),
            catchError((error) =>
              of(UserActions.createUserFailure({ error }))
            )
          )
        )
      );
    });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUserById),
      concatMap((action) =>
        this.usersService.deleteUserById(action.id).pipe(
          map(() =>
            UserActions.deleteUserByIdSuccess({ id: action.id })
          ),
          catchError((error) =>
            of(UserActions.deleteUserByIdFailure({ error }))
          )
        )
      )
    );
  });

  constructor(private usersService: UsersService) {}
}
