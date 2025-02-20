import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
  selector: 'app-courses-list',
  standalone: false,

  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {
  @Input()
  dataSource: Course[] = [];

  @Output()
  delete = new EventEmitter<string>();

  @Output()
  edit = new EventEmitter<Course>();

  displayedColumns = ['name', 'actions'];

  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin$;
  }
}
