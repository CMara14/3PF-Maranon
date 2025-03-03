import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { TitleFontDirective } from './directives/title-font.directive';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [FullNamePipe, TitleFontDirective],
  imports: [CommonModule],
  exports: [
    FullNamePipe,
    TitleFontDirective,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
})
export class SharedModule {}
