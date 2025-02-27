import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthUserName } from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-toolbar',
  standalone: false,
  
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
@Output() showNavbar = new EventEmitter();

authUserName$: Observable<string | undefined>;

constructor(private store: Store) {
  this.authUserName$ = this.store.select(selectAuthUserName);
}
}
