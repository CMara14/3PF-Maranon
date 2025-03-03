import { TestBed } from '@angular/core/testing';
import { EnrollmentsService } from './enrollments.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { Enrollment } from '../../modules/dashboard/pages/enrollments/models';

describe('EnrollmentsService', () => {
  let enrollmentsService: EnrollmentsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EnrollmentsService],
    });

    enrollmentsService = TestBed.inject(EnrollmentsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should instantiate EnrollmentsService', () => {
    expect(enrollmentsService).toBeTruthy();
  });

  it('getEnrollments should fetch enrollments list', () => {
    const mockEnrollments: Enrollment[] = [
      { id: '1', studentId: '100', courseId: '200' },
    ];

    enrollmentsService.getEnrollments().subscribe((enrollments) => {
      expect(enrollments).toEqual(mockEnrollments);
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/enrollments`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockEnrollments);
  });

  it('createEnrollment should create an enrollment', () => {
    const newEnrollment: Omit<Enrollment, 'id'> = {
      studentId: '101',
      courseId: '201',
    };
    const createdEnrollment: Enrollment = { ...newEnrollment, id: '2' };

    enrollmentsService.createEnrollment(newEnrollment).subscribe((enrollment) => {
      expect(enrollment).toEqual(createdEnrollment);
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/enrollments`
    );
    expect(req.request.method).toBe('POST');
    req.flush(createdEnrollment);
  });
});
