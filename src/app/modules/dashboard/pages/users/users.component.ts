import { Component } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';
import { Observable, Subscription } from 'rxjs';
import { User } from './models';
import { Store } from '@ngrx/store';
import { selectUsers } from './store/user.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { UserActions } from './store/user.actions';
import { v6 as uuidv6 } from 'uuid';

@Component({
  selector: 'app-users',
  standalone: false,

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users: User[] = [];
  usersSubscription?: Subscription;
  users$: Observable<User[]>;
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['name', 'email', 'role', 'options'];

  constructor(
    private usersService: UsersService,
    private store: Store,
    private matDialog: MatDialog
  ) {
    this.users$ = this.store.select(selectUsers);
  }
  ngOnInit(): void {
    this.usersService.loadUsers();
    this.users$.subscribe((users) => {
      this.dataSource.data = users;
    });
  }
  ngOnDestroy(): void {
    this.usersService.resetUserState();
  }

  deleteUserById(id: string) {
    this.store.dispatch(UserActions.deleteUserById({ id }));
  }

  openFormDialog(): void {
    this.matDialog
      .open(UsersFormComponent)
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (!!data) {
            this.store.dispatch(
              UserActions.createUser({
                data: {
                  name: data.name,
                  email: data.email,
                  role: data.role,
                  password: data.password,
                  accessToken: uuidv6(),
                },
              })
            );
          }
        },
      });
  }
}
