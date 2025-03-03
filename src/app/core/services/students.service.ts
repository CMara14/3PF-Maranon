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
  // private studentsUrl: string = 'public/students.json';
  constructor(private httpClient: HttpClient, private store: Store) {}

  // getStudents(): Observable<Student[]> {
  //   return of([...data]).pipe(delay(2000));
  // }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${environment.baseApiUrl}/students`);
  }

  // getStudentById(studentId: string): Observable<any> {
  //   return this.http
  //     .get<Student[]>(this.studentsUrl)
  //     .pipe(
  //       map((students) => students.find((student) => student.id === studentId))
  //     );
  // }
  getStudentById(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(
      `${environment.baseApiUrl}/students/${studentId}`
    );
  }

  deleteStudent(id: string): Observable<Student[]> {
    data = data.filter((student) => student.id != id);
    return this.getStudents();
  }

  // updateStudent(
  //   id: string,
  //   formData: {
  //     name: string;
  //     lastName: string;
  //     email: string;
  //     phoneNumber: number;
  //   }
  // ): Observable<Student[]> {
  //   data = data.map((student: Student) =>
  //     student.id === id ? { ...student, ...formData } : student
  //   );
  //   return this.getStudents();
  // }

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

  // addStudent(payload: {
  //   name: string;
  //   lastName: string;
  //   email: string;
  //   phoneNumber: number;
  // }): Observable<Student[]> {
  //   data.push({
  //     ...payload,
  //     id: uuidv4(),
  //   });
  //   return this.getStudents();
  // }
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
