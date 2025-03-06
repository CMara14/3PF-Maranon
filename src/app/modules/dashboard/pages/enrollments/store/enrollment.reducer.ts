import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';
import { Enrollment } from '../models';

export const enrollmentFeatureKey = 'enrollment';

export interface State {
  enrollments: Enrollment[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  enrollments: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentActions.loadEnrollments, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      enrollments: action.data,
      isLoading: false,
      error: null,
    };
  }),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  on(EnrollmentActions.createEnrollment, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(EnrollmentActions.createEnrollmentSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      enrollments: [...state.enrollments, action.data],
    };
  }),
  on(EnrollmentActions.createEnrollmentFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  on(EnrollmentActions.deleteEnrollment, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(EnrollmentActions.deleteEnrollmentSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    error: null,
    enrollments: state.enrollments.filter((enrollment) => enrollment.id !== action.id), // Aquí estaba el error
  })),
  on(EnrollmentActions.deleteEnrollmentFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(EnrollmentActions.resetState, () => initialState),

  on(EnrollmentActions.loadEnrollmentsSuccess, (state, action) => state),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, action) => state)
);

export const enrollmentFeature = createFeature({
  name: enrollmentFeatureKey,
  reducer,
});
