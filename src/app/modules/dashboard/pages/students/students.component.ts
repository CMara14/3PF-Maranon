import { Component } from '@angular/core';
import { Student } from './models';
import { STUDENTS_DATA } from './mocks/students';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'options'];
  students = STUDENTS_DATA;
  editingStudentId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  showNotification(message: string): void {
    this.snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  handleDeleteStudent(id: string) {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: 'Esta acción no se puede deshacer.',
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.students = this.students.filter((student) => student.id !== id);
        this.showNotification('El estudiante ha sido eliminado con éxito.');
      }
    });
  }
  handleEditStudent(student: Student): void {
    this.editingStudentId = student.id;

    this.matDialog
      .open(StudentsFormComponent, {
        data: student,
      })
      .afterClosed()
      .subscribe({
        next: (formValue) => {
          if (!!formValue) {
            this.students = this.students.map((student) =>
              student.id === this.editingStudentId
                ? { ...student, ...formValue }
                : student
            );
            this.editingStudentId = null;
            this.showNotification(
              'El estudiante ha sido actualizado con éxito.'
            );
          }
        },
      });
  }

  handleCreateStudent(): void {
    this.matDialog
      .open(StudentsFormComponent)
      .afterClosed()
      .subscribe({
        next: (formValue) => {
          if (!!formValue) {
            this.students = [
              ...this.students,
              {
                id: uuidv4(),
                ...formValue,
              },
            ];
            this.showNotification('El estudiante ha sido creado con éxito.');
          }
        },
      });
  }
}
