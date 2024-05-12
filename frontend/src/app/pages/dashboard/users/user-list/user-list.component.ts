import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../user.interface';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  imports: [MatTableModule, DatePipe, MatPaginatorModule, MatIconModule, MatButtonModule]
})
export class UserListComponent {
  @Input() dataSource: IUser[] = [];

  @Output() onEditUser = new EventEmitter<IUser>();
  @Output() onDeleteUser = new EventEmitter<number>();

  displayedColumns: string[] = ['name', 'email', 'birthday', 'actions'];

  editUser(user: IUser) {
    this.onEditUser.emit(user);
  }

  deleteUser(id: number) {
    this.onDeleteUser.emit(id);
  }
}
