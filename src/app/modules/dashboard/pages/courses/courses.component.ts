import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../core/services/courses.service';
import { Course } from './models';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { AuthService } from '../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../students/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-courses',
  standalone: false,

  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  isLoading = false;

  dataSource: Course[] = [];

  isAdmin$: Observable<boolean>;
  constructor(
    private courseService: CourseService,
    private matDialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.isAdmin$ = this.authService.isAdmin$;
  }

  handleCoursesDataUpdate(data: Course[]): void {
    this.dataSource = [...data];
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.handleCoursesDataUpdate(data);
      },
      error: () => {
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

  openFormDialog(editingCourse?: Course): void {
    this.matDialog
      .open(CourseFormComponent, { data: { editingCourse } })
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (!!data) {
            if (!!editingCourse) {
              this.handleEditCourse(editingCourse.id, data);
            } else {
              this.handleAddCourse(data);
            }
          }
        },
      });
  }

  handleEditCourse(id: string, data: { name: string }) {
    this.isLoading = true;
    this.courseService.updateCourse(id, data).subscribe({
      next: (data) => this.handleCoursesDataUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => { (this.isLoading = false)
        this.showNotification(
          'El curso ha sido actualizado con éxito.'
        );
      }
    });
  }

  handleAddCourse(data: { name: string }): void {
    this.isLoading = true;
    this.courseService.addCourse(data).subscribe({
      next: (data) => this.handleCoursesDataUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => {
        (this.isLoading = false),
        this.showNotification('El curso ha sido creado con éxito.');
      }
    });
  }

  handleDeleteCourse(id: string): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: 'Esta acción no se puede deshacer.',
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.isLoading = true;
        this.courseService.deleteCourse(id).subscribe({
          next: (data) => {
            this.handleCoursesDataUpdate(data);
          },
          error: (err) => {
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
            this.showNotification('El curso ha sido eliminado con éxito.');
          },
        });
      }
    })
  }
}
