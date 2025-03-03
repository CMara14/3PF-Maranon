import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Validators } from '@angular/forms';
import { MockProvider } from 'ng-mocks';
import { SharedModule } from '../../../../shared/shared.module';
import { AuthService } from '../../../../core/services/auth.service';

describe('LoginComponent', () => {
  let loginComponent: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule],
      providers: [MockProvider(AuthService)],
    }).compileComponents();

    loginComponent = TestBed.createComponent(LoginComponent).componentInstance;
  });

  it('should instantiate the Login component', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should require email and password in LoginForm', () => {
    expect(
      loginComponent.loginForm.get('email')?.hasValidator(Validators.required)
    ).toBe(true);
    expect(
      loginComponent.loginForm
        .get('password')
        ?.hasValidator(Validators.required)
    ).toBe(true);
  });

  it('should call the method markAllAsTouched, if the form is not valid.', () => {
    loginComponent.loginForm.setValue({
      email: '',
      password: '',
    });

    const spyOnMarkAllAsTouched = spyOn(
      loginComponent.loginForm,
      'markAllAsTouched'
    );
    loginComponent.onSubmit();
    expect(spyOnMarkAllAsTouched).toHaveBeenCalledTimes(1);
  });

  it('should call AuthService login if the form is valid', () => {
    loginComponent.loginForm.setValue({
      email: 'email@mail.com',
      password: 'password',
    });
    const spyOnLogin = spyOn((loginComponent as any).authService, 'login');
    loginComponent.onSubmit();
    expect(spyOnLogin).toHaveBeenCalledTimes(1);
  });
});
