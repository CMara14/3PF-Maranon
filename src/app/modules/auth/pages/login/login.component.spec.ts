import { TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { SharedModule } from '../../../../shared/shared.module';
import { Validators } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  // let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule],
    }).compileComponents();

    // fixture = TestBed.createComponent(LoginComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should instantiate the login component', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    expect(fixture.componentInstance).toBeDefined();
  });

  it('should instantiate the login component', () => {
    const loginComponent =
      TestBed.createComponent(LoginComponent).componentInstance;
    expect(
      loginComponent.loginForm.get('email')?.hasValidator(Validators.required)
    ).toBe(true);
    expect(
      loginComponent.loginForm
        .get('password')
        ?.hasValidator(Validators.required)
    ).toBe(true);
  });

  it('should instantiate the login component', () => {
    const loginComponent = TestBed.createComponent(LoginComponent);
    expect(fixture.componentInstance).toBeDefined();
  });
});
