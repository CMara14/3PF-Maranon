import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { enrollmentFeature } from './store/enrollment.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EnrollmentEffects } from './store/enrollment.effects';
import { EnrollmentsComponent } from './enrollments.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    EnrollmentsRoutingModule,
    StoreModule.forFeature(enrollmentFeature),
    EffectsModule.forFeature([EnrollmentEffects]),
  ]
})
export class EnrollmentsModule { }
