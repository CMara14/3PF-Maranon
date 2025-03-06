import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Enrollment } from './models';
import { Course } from '../courses/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CourseService } from '../../../../core/services/courses.service';
import { EnrollmentActions } from './store/enrollment.actions';
import {
  selectEnrollments,
  selectEnrollmentsError,
  selectIsLoadingEnrollments,
} from './store/enrollment.selectors';
import { Student } from '../students/models';
import { StudentsService } from '../../../../core/services/students.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-enrollments',
  standalone: false,

  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss',
})
export class EnrollmentsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['student', 'course', 'schedule', 'options'];
  enrollments$: Observable<Enrollment[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>;

  courses: Course[] = [];
  students: Student[] = [];
  schedules: string[] = ['Mañana', 'Tarde', 'Noche'];

  enrollmentForm: FormGroup;
  dataSource = new MatTableDataSource<Enrollment>();

  constructor(
    private store: Store,
    private coursesService: CourseService,
    private studentsService: StudentsService,
    private fb: FormBuilder
  ) {
    this.enrollments$ = this.store.select(selectEnrollments);
    this.error$ = this.store.select(selectEnrollmentsError);
    this.isLoading$ = this.store.select(selectIsLoadingEnrollments);
    this.enrollmentForm = this.fb.group({
      student: [null, Validators.required],
      course: [null, Validators.required],
      schedule: [null, Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.store.dispatch(EnrollmentActions.resetState());
  }
  ngOnInit(): void {
    this.store.dispatch(EnrollmentActions.loadEnrollments());
    this.loadStudentsAndCourses();

    this.enrollments$.subscribe((enrollments) => {
      this.dataSource.data = enrollments;
    });
  }

  loadStudentsAndCourses(): void {
    forkJoin([
      this.coursesService.getCourses(),
      this.studentsService.getStudents(),
    ]).subscribe({
      next: ([courses, students]) => {
        this.courses = courses;
        this.students = students;
      },
    });
  }

  createEnrollment(data: {
    course: string;
    student: string;
    schedule: string;
  }): void {
    this.store.dispatch(
      EnrollmentActions.createEnrollment({
        data: {
          course: data.course,
          student: data.student,
          schedule: data.schedule,
        },
      })
    );
  }

  deleteEnrollment(enrollmentId: string): void {
    this.store.dispatch(
      EnrollmentActions.deleteEnrollment({ id: enrollmentId })
    );
  }

  onSubmit(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
    } else {
      this.store.dispatch(
        EnrollmentActions.createEnrollment({ data: this.enrollmentForm.value })
      );
    }
  }
}
