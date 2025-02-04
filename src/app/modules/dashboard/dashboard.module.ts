import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StudentsModule } from './pages/students/students.module';
import { SharedModule } from '../../shared/shared.module';
import { CoursesModule } from './pages/courses/courses.module';
import { HomeModule } from './pages/home/home.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    StudentsModule,
    CoursesModule,
    HomeModule
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
