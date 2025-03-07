import { Injectable } from '@angular/core';
import { concatMap, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { UserActions } from '../../modules/dashboard/pages/users/store/user.actions';
import { environment } from '../../../environments/environment';
import { User } from '../../modules/dashboard/pages/users/models';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.baseApiUrl}/users`);
  }

  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  deleteUserById(id: string): Observable<User[]> {
    return this.httpClient
      .delete<User>(`${environment.baseApiUrl}/users/${id}`)
      .pipe(concatMap(() => this.getUsers()));
  }

  resetUserState(): void {
    this.store.dispatch(UserActions.resetState());
  }

  createUser(data: Omit<User, 'id'>): Observable<User> {
    return this.httpClient.post<User>(`${environment.baseApiUrl}/users`, data);
  }
}
