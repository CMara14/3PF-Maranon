import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { Course } from '../../modules/dashboard/pages/courses/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private httpClient: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${environment.baseApiUrl}/courses`);
  }

  getCourseById(id: string): Observable<Course> {
    return this.httpClient.get<Course>(
      `${environment.baseApiUrl}/courses/${id}?_embed=teachers`
    );
  }
  updateCourse(id: string, data: { name: string }): Observable<Course[]> {
      return this.httpClient
      .patch<Course>(`${environment.baseApiUrl}/courses/${id}`, data)
      .pipe(concatMap(() => this.getCourses()));
    }


  addCourse(payload: { name: string }): Observable<Course[]> {
    return (
      this.httpClient
        .post<Course>(`${environment.baseApiUrl}/courses`, payload)
        .pipe(concatMap(() => this.getCourses()))
    );
  }

  deleteCourse(id: string): Observable<Course[]> {
    return (
      this.httpClient
        .delete<Course>(`${environment.baseApiUrl}/courses/${id}`)
        .pipe(concatMap(() => this.getCourses()))
    );
  }
}
