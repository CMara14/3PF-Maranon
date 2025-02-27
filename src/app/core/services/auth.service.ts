import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../modules/dashboard/pages/users/models';
import { Router } from '@angular/router';
import { LoginData } from '../../modules/auth/models';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../store/auth/auth.selectors';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthActions } from '../../store/auth/auth.action';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authUser$ = new BehaviorSubject<null | User>(null);
  authUser$ = this._authUser$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store
  ) {
    this.authUser$ = this.store.select(selectAuthUser);
  }

  get isAdmin$(): Observable<boolean> {
    return this.authUser$.pipe(map((x) => x?.role === 'ADMIN'));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.store.dispatch(AuthActions.unsetAuthUser());
    this.router.navigate(['auth', 'login']);
  }

  login(payload: LoginData): void {
    this.httpClient
    .get<User[]>(
      `${environment.baseApiUrl}/users?email=${payload.email}&password=${payload.password}`
    )
    .subscribe({
      next: (response) => {
        if (!response[0]) {
          //TODO agregar toast
          alert('Email o password invalidos');
        } else {
          localStorage.setItem('access_token', response[0].accessToken);
          this.store.dispatch(
            AuthActions.setAuthUser({ user: response[0] })
          );
          this.router.navigate(['dashboard', 'home']);
        }
      },
      //TODO agregar toast y tipos de error
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            alert('El servidor esta caido');
          }
        }
      },
    });
  }

  isAuthenticated(): Observable<boolean> {
  return this.httpClient
  .get<User[]>(
    `${environment.baseApiUrl}/users?accessToken=${localStorage.getItem(
      'access_token'
    )}`
  )
  .pipe(
    map((res) => {
      const user = res[0];
      if (user) {
        this.store.dispatch(AuthActions.setAuthUser({ user: user }));
      }
      return !!user;
    })
  );
  }
}
