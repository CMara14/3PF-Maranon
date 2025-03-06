import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { EnrollmentsService } from '../../../../../core/services/enrollments.service';

@Injectable()
export class EnrollmentEffects {
  private actions$ = inject(Actions);

  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollments),
      concatMap(() =>
        this.enrollmentsService.getEnrollments().pipe(
          map((enrollments) =>
            EnrollmentActions.loadEnrollmentsSuccess({ data: enrollments })
          ),
          catchError((error) =>
            of(EnrollmentActions.loadEnrollmentsFailure({ error }))
          )
        )
      )
    );
  });

  createEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.createEnrollment),
      concatMap((action) =>
        this.enrollmentsService.createEnrollment(action.data).pipe(
          map((enrollment) =>
            EnrollmentActions.createEnrollmentSuccess({ data: enrollment })
          ),
          catchError((error) =>
            of(EnrollmentActions.createEnrollmentFailure({ error }))
          )
        )
      )
    );
  });

  deleteEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.deleteEnrollment),
      concatMap((action) =>
        this.enrollmentsService.deleteEnrollment(action.id).pipe(
          map(() =>
            EnrollmentActions.deleteEnrollmentSuccess({ id: action.id })
          ),
          catchError((error) =>
            of(EnrollmentActions.deleteEnrollmentFailure({ error }))
          )
        )
      )
    );
  });

  constructor(private enrollmentsService: EnrollmentsService) {}
}
