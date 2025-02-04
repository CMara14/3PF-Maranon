import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsFormComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
  ],
  exports: [StudentsComponent],
})
export class StudentsModule {}
