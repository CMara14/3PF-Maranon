import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models';

interface CoursesFormData {
  editingCourse?: Course;
}

@Component({
  selector: 'app-course-form',
  standalone: false,

  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent {
  coursesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CourseFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: CoursesFormData
  ) {
    this.coursesForm = this.fb.group({
      name: ['', [Validators.required]],
    });

    if (!!data && !!data.editingCourse) {
      this.coursesForm.patchValue(data.editingCourse);
    }
  }

  onConfirm(): void {
    if (this.coursesForm.invalid) {
      this.coursesForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.coursesForm.value);
    }
  }
}
