import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [CoursesComponent, CourseDetailComponent, CourseFormComponent, CoursesListComponent],
  imports: [CommonModule, CoursesRoutingModule, SharedModule],
  exports: [CoursesComponent],
})
export class CoursesModule {}
