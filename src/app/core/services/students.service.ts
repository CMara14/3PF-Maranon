import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, delay, map, Observable, of } from 'rxjs';
import { Student } from '../../modules/dashboard/pages/students/models';
import { STUDENTS_DATA } from '../../modules/dashboard/pages/students/mocks/students';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';

let data = STUDENTS_DATA;

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private httpClient: HttpClient, private store: Store) {}
  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${environment.baseApiUrl}/students`);
  }

  getStudentById(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(
      `${environment.baseApiUrl}/students/${studentId}`
    );
  }

  deleteStudent(id: string): Observable<Student[]> {
    data = data.filter((student) => student.id != id);
    return this.getStudents();
  }

  updateStudent(
    id: string,
    formData: {
      name: string;
      lastName: string;
      email: string;
      phoneNumber: number;
    }
  ): Observable<Student[]> {
    return this.httpClient
      .patch<Student>(`${environment.baseApiUrl}/students/${id}`, formData)
      .pipe(concatMap(() => this.getStudents()));
  }

  addStudent(payload: {
    name: string;
    lastName: string;
    email: string;
    phoneNumber: number;
  }): Observable<Student[]> {
    return this.httpClient
      .post<Student>(`${environment.baseApiUrl}/students`, payload)
      .pipe(concatMap(() => this.getStudents()));
  }
}
