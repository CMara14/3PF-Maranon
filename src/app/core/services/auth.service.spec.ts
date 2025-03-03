import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { environment } from '../../../environments/environment';
import { User } from '../../modules/dashboard/pages/users/models';

describe('AuthService', () => {
  let authService: AuthService;
  let router: Router;
  let httpTestingController: HttpTestingController;

  const initialState = {
    auth: {
      authUser: null,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        MockProvider(Router),
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();
    localStorage.clear();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should instantiate AuthService', () => {
    expect(authService).toBeTruthy();
  });

  it('should set the authenticated user, set the access token in localStorage and redirect to home if the login is successful', () => {
    const spyOnNavigate = spyOn(router, 'navigate');
    const fakeLoginData = {
      email: 'admin@email.com',
      password: 'password',
    };
    const mockResponse: User[] = [
      {
        id: 'sdsad',
        accessToken: 'asdasdasdas',
        email: 'asdasdas@mail.com',
        name: 'fake_user',
        password: 'password',
        role: 'ADMIN',
      },
    ];

    authService.login(fakeLoginData, () => {
      expect(localStorage.getItem('access_token')).toBeTruthy();
      expect(spyOnNavigate).toHaveBeenCalledWith(['dashboard', 'home']);
    });

    httpTestingController
      .expectOne({
        method: 'GET',
        url: `${environment.baseApiUrl}/users?email=${fakeLoginData.email}&password=${fakeLoginData.password}`,
      })
      .flush(mockResponse);
  });

  it('should display a message "Invalid email or password" if the data is incorrect', () => {
    const spyOnAlert = spyOn(window, 'alert');

    const fakeLoginData = {
      email: 'admin@email.com',
      password: '123456',
    };
    const mockResponse: User[] = [];
    authService.login(fakeLoginData, () => {
      expect(spyOnAlert).toHaveBeenCalledWith('Email o password invalidos');
    });
    httpTestingController
      .expectOne({
        method: 'GET',
        url: `${environment.baseApiUrl}/users?email=${fakeLoginData.email}&password=${fakeLoginData.password}`,
      })
      .flush(mockResponse);
  });
});
