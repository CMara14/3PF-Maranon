import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AuthService } from '../../../../core/services/auth.service';
import { MockProvider } from 'ng-mocks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [SharedModule],
      providers: [MockProvider(AuthService), provideMockStore({})],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should instantiate the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit showNavbar event when called', () => {
    spyOn(component.showNavbar, 'emit');

    component.showNavbar.emit();

    expect(component.showNavbar.emit).toHaveBeenCalled();
  });

});
