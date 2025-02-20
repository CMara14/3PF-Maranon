import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-detail',
  standalone: false,

  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent implements OnInit {
  isLoading = false;
  course: Course | null = null;

  errorMessage = '';

  constructor(
    private coursesService: CourseService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.coursesService
      .getCourseById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (course) => {
          this.course = course;
          this.errorMessage = '';
        },
        complete: () => {
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;

          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              // TODO agregar un toast
              this.errorMessage = 'El curso no existe';
            }
          }
        },
      });
  }
}
