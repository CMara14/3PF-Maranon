import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../modules/dashboard/pages/users/models';
import { Router } from '@angular/router';
import { LoginData } from '../../modules/auth/models';
import { v4 as uuidv4 } from 'uuid';

const FAKE_USERS_DB: User[] = [
  {
    id: uuidv4(),
    email: 'admin@email.com',
    password: 'admin',
    name: 'Administrador',
    accessToken: '4e84a2a3e2f56b3558c6dfaacdd49ea81a40c6c0be1bfd1b7a1a1dd66a53f829',
    role: 'ADMIN',
  },
  {
    id: uuidv4(),
    email: 'employee@email.com',
    password: 'empleado',
    name: 'Empleado',
    accessToken: '90a6fe412b43446dfb144984cc54b16a494a439ea257f08b7bd170537ec3d7a1',
    role: 'EMPLOYEE',
  },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authUser$ = new BehaviorSubject<null | User>(null);
  authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) {}

  get isAdmin$(): Observable<boolean> {
    return this.authUser$.pipe(map((x) => x?.role === 'ADMIN'));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this._authUser$.next(null);
    this.router.navigate(['auth', 'login']);
  }

  login(payload: LoginData): void {
    const loginResult = FAKE_USERS_DB.find(
      (user) =>
        user.email === payload.email && user.password === payload.password
    );
    if (!loginResult) {
      alert('Email o password invalidos');
      return;
    }
    localStorage.setItem('access_token', loginResult.accessToken);
    this._authUser$.next(loginResult);
    this.router.navigate(['dashboard', 'home']);
  }

  isAuthenticated(): Observable<boolean> {
    /**
     * authUser = null entonces quiero retornar false
     * authUSer != null entonces quiero retornar true
     */
    const storegeUser = FAKE_USERS_DB.find(
      (x) => x.accessToken === localStorage.getItem('access_token')
    );
    this._authUser$.next(storegeUser || null);
    return this.authUser$.pipe(map((x) => !!x));
  }
}