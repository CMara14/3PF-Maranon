import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Enrollment } from './models';
import { Course } from '../courses/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CourseService } from '../../../../core/services/courses.service';
import { EnrollmentActions } from './store/enrollment.actions';
import { selectEnrollments, selectEnrollmentsError, selectIsLoadingEnrollments } from './store/enrollment.selectors';
import { v4 as uuidv4 } from 'uuid';
import { Student } from '../students/models';
import { StudentsService } from '../../../../core/services/students.service';

@Component({
  selector: 'app-enrollments',
  standalone: false,
  
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnInit, OnDestroy {
  enrollments$: Observable<Enrollment[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>;

  courses: Course[] = [];
  students: Student[] = [];

  enrollmentForm: FormGroup;

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
      studentId: [null, Validators.required],
      courseId: [null, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(EnrollmentActions.resetState());
  }
  ngOnInit(): void {
    this.store.dispatch(EnrollmentActions.loadEnrollments());
    this.loadStudentsAndCourses();
  }

  loadStudentsAndCourses(): void {
    forkJoin([
      this.coursesService.getCourses(),
      //ACTUALIZAR CON EL SERVICIO PARA OBTENER ESTUDIANTES EN LA BASE DE DATOS
      this.studentsService.getStudents(),
    ]).subscribe({
      next: ([courses, students]) => {
        this.courses = courses;
        this.students = students;
      },
    });
  }

  createEnrollment(): void {
    this.store.dispatch(
      EnrollmentActions.createEnrollment({
        data: {
          courseId: uuidv4(),
          studentId: uuidv4(),
        },
      })
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
