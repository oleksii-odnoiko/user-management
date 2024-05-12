import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { UsersService } from './users.service';
import { IUser } from './user.interface';
import { UserCreateUpdateComponent } from './user-create-update/user-create-update.component';
import { AlertService } from '@shared/components';

import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];

  loading = true;

  constructor(
    private service: UsersService,
    public dialog: MatDialog,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.getData();
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.showLoading();
    const groupdId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.service.getAll(groupdId).subscribe({
      next: (data) => {
        this.users = data;
        this.hideLoading();
      },
      error: (error) => {
        this.alertService.error(error);
        this.hideLoading();
      }
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(UserCreateUpdateComponent, {
      width: '400px',
      data: {
        name: '',
        email: '',
        birthday: '',
        groupId: parseInt(this.route.snapshot.paramMap.get('id')!, 10)
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getData();
    });
  }

  editUser(event: IUser) {
    const dialogRef = this.dialog.open(UserCreateUpdateComponent, {
      width: '400px',
      data: {
        ...event,
        groupId: parseInt(this.route.snapshot.paramMap.get('id')!, 10)
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getData();
    });
  }

  deleteUser(event: number) {
    this.showLoading();
    this.service.delete(event).subscribe({
      next: () => {
        this.alertService.success('User was deleted');
        this.getData();
      },
      error: (error) => {
        this.alertService.error(error);
        this.hideLoading();
      }
    });
  }

  private showLoading() {
    this.loading = true;
  }

  private hideLoading() {
    this.loading = false;
  }
}
