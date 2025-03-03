import { Component } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';
import { Observable } from 'rxjs';
import { User } from './models';
import { Store } from '@ngrx/store';
import { selectUsers } from './store/user.selectors';

@Component({
  selector: 'app-users',
  standalone: false,
  
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users$: Observable<User[]>;

  constructor(private usersService: UsersService,  private store: Store) {
    this.users$ = this.store.select(selectUsers);
  }
  ngOnInit(): void {
    this.usersService.loadUsers();
  }
  
  ngOnDestroy(): void {
    this.usersService.resetUserState();
  }

  deleteUserById(id: string) {
    this.usersService.deleteUserById(id);
  }
}
