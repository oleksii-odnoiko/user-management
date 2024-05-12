import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from './users.service';
import { UsersComponent } from './users.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateUpdateComponent } from './user-create-update/user-create-update.component';
import { LoaderModule } from '@shared/components';
import { MatGridListModule } from '@angular/material/grid-list';
import { UsersRoutingModule } from './users-routing.module';
import { MatIcon } from "@angular/material/icon";

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    UserListComponent,
    UserCreateUpdateComponent,
    LoaderModule,
    MatGridListModule,
    UsersRoutingModule,
    MatIcon
  ],
  exports: [UsersComponent],
  providers: [UsersService]
})
export class UsersModule {}
