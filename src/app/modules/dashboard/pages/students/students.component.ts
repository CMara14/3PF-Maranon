import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from './models';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { StudentsService } from '../../../../core/services/students.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'options'];
  editingStudentId: string | null = null;
  students: Student[] = [];
  selectedStudent: any;
  isLoading = false;
  error = false;
  studentsSubscription?: Subscription;
  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private studentsService: StudentsService
  ) {}

  ngOnDestroy(): void {
    this.studentsSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.studentsSubscription = this.studentsService
      .getStudents()
      .subscribe({
        next: (students: Student[]) => {
          this.students = [...students];
          this.isLoading = false;
        },
        error: (error) => {
          this.error = true;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  showNotification(message: string): void {
    this.snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  handleStudentsDataUpdate(data: Student[]): void {
    this.students = [...data];
  }

  handleStudentDetail(id: string) {
    this.studentsService.getStudentById(id).subscribe((student) => {
      this.selectedStudent = student;
    });
  }

  handleDeleteStudent(id: string): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: 'Esta acción no se puede deshacer.',
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.isLoading = true;
        this.studentsService.deleteStudent(id).subscribe({
          next: (data) => {
            console.log(data);
            this.handleStudentsDataUpdate(data);
          },
          error: (err) => {
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
            this.showNotification('El estudiante ha sido eliminado con éxito.');
          },
        });
      }
    });
  }

  openFormDialog(student?: Student): void {
    this.matDialog
    .open(StudentsFormComponent, {
      data: student,
    })
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (!!data) {
            if (!!student) {
              this.handleEditStudent(student.id, data);
            } else {
              this.handleCreateStudent(data);
            }
          }
        },
      });
  }

  handleEditStudent(id: string, data: {
    name: string;
    lastName: string;
    email: string;
    phoneNumber: number;
  }) {
    this.isLoading = true;
    this.studentsService.updateStudent(id, data).subscribe({
      next: (data) => this.handleStudentsDataUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => {
        this.isLoading = false
        this.showNotification(
          'El estudiante ha sido actualizado con éxito.'
        );
      },
    });
  }

  handleCreateStudent(data: {
    name: string;
    lastName: string;
    email: string;
    phoneNumber: number;
  }): void {
    this.isLoading = true;
    this.studentsService.addStudent(data).subscribe({
      next: (data) => this.handleStudentsDataUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => {
        this.isLoading = false
        this.showNotification('El estudiante ha sido creado con éxito.');
      },
      
    });
  }
}
