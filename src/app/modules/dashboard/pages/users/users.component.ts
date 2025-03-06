import { Component } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';
import { Subscription } from 'rxjs';
import { User } from './models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-users',
  standalone: false,
  
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: User[] = [];
  usersSubscription?: Subscription;

  constructor(private usersService: UsersService,  private store: Store) {
  }
  ngOnInit(): void {
    this.usersService.loadUsers();
  }

  loadStudents(): void {
      this.usersSubscription = this.usersService
        .getUsers()
        .subscribe({
          next: (users: User[]) => {
            this.users = [...users];
          },
        });
    }
  
  ngOnDestroy(): void {
    this.usersService.resetUserState();
  }

  deleteUserById(id: string) {
    this.usersService.deleteUserById(id);
  }
}
