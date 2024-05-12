import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { JsonPipe } from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { IUser } from '../user.interface';
import { UsersService } from '../users.service';
import { AlertService, LoaderModule } from '@shared/components';
import { TrimInputModule } from "@shared/directives";

@Component({
  selector: 'app-user-create-update',
  standalone: true,
  templateUrl: './user-create-update.component.html',
  styleUrl: './user-create-update.component.scss',
  providers: [provideNativeDateAdapter(), UsersService],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
    LoaderModule,
    JsonPipe,
    TrimInputModule
  ]
})
export class UserCreateUpdateComponent {
  loading = false;
  userForm = this.formBuilder.group({
    name: [this.data.name, Validators.required],
    email: [this.data.email, [Validators.required, Validators.email]],
    birthday: [this.data.birthday, Validators.required]
  });
  isNewUser = false;

  constructor(
    public dialogRef: MatDialogRef<UserCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userService: UsersService
  ) {
    this.isNewUser = !this.data.id;
  }

  saveUser() {
    this.showLoading();
    const user = {
      groupId: this.data.groupId,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      birthday: this.userForm.value.birthday
    } as IUser;
    if (!this.isNewUser) {
      user.id = this.data.id;
    }
    this.save(user).subscribe({
      next: () => {
        this.hideLoading();
        const msg = this.isNewUser ? 'A new user was added' : 'The user was updated';
        this.alertService.success(msg);
        this.closeDialog(true);
      },
      error: (error) => {
        this.alertService.error(error);
        this.hideLoading();
      }
    });
  }

  closeDialog(isUpdated = false) {
    this.dialogRef.close(isUpdated);
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get birthday() {
    return this.userForm.get('birthday');
  }

  private save(user: IUser) {
    return user.id ? this.userService.update(user.id, user) : this.userService.create(user);
  }

  private showLoading() {
    this.loading = true;
  }

  private hideLoading() {
    this.loading = false;
  }
}
