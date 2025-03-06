import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { Enrollment } from '../../modules/dashboard/pages/enrollments/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EnrollmentsService {
  constructor(private httpClient: HttpClient) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(
      `${environment.baseApiUrl}/enrollments`
    );
  }

  deleteEnrollment(id: string): Observable<Enrollment[]> {
    return (
      this.httpClient
        .delete<Enrollment>(`${environment.baseApiUrl}/enrollments/${id}`)
        .pipe(concatMap(() => this.getEnrollments()))
    );
  }

  createEnrollment(data: Omit<Enrollment, 'id'>): Observable<Enrollment> {
    return this.httpClient.post<Enrollment>(
      `${environment.baseApiUrl}/enrollments`,
      data
    );
  }
}
