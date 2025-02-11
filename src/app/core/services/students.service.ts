import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Student } from '../../modules/dashboard/pages/students/models';
import { STUDENTS_DATA } from '../../modules/dashboard/pages/students/mocks/students';
import { v4 as uuidv4 } from 'uuid';

let data = STUDENTS_DATA;

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private studentsUrl: string = 'public/students.json';
  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return of([...data]).pipe(delay(2000));
  }

  getStudentById(studentId: string): Observable<any> {
    return this.http
      .get<Student[]>(this.studentsUrl)
      .pipe(
        map((students) => students.find((student) => student.id === studentId))
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
    data = data.map((student: Student) =>
      student.id === id ? { ...student, ...formData } : student
    );
    return this.getStudents();
  }

  addStudent(payload: {
    name: string;
    lastName: string;
    email: string;
    phoneNumber: number;
  }): Observable<Student[]> {
    data.push({
      ...payload,
      id: uuidv4(),
    });
    return this.getStudents();
  }
}
