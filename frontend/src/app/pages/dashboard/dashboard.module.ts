import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { UsersModule } from './users/users.module';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupListService } from './group-list/group-list.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, MatGridListModule, UsersModule, GroupListComponent],
  providers: [GroupListService]
})
export class DashboardModule {}
