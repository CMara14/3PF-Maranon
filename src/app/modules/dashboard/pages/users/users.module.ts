import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './store/user.reducer';
import { UserEffects } from './store/user.effects';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../../../shared/shared.module';
import { UsersFormComponent } from './components/users-form/users-form.component';

@NgModule({
  declarations: [UsersComponent, UsersFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class UsersModule {}
