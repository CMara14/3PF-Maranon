import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models';

@Component({
  selector: 'app-users-dialog-form',
  standalone: false,

  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss',
})
export class UsersFormComponent {
  userForm: FormGroup;
  isEditing: boolean = false;
  roles: string[] = ['ADMIN', 'EMPLOYEE'];

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<UsersFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: User
  ) {
    this.userForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      role: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.userForm.value);
      this.userForm.reset();
    }
  }
}