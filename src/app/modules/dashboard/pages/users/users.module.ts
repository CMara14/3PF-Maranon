import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './store/user.reducer';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    StoreModule.forFeature(userFeature)
  ]
})
export class UsersModule { }
