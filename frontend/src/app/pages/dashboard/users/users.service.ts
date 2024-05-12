import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IUser } from './user.interface';

import { catchError, Observable, throwError } from 'rxjs';
import { ApiError } from "@shared/interfaces";

@Injectable()
export class UsersService {
  private readonly baseUrl = '/api/users';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else if (error.status === 400) {
      const msg = error.error.map((item: ApiError) => item.msg).join('. ');
      return throwError(() => new Error(msg));
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
      return throwError(() => new Error(error.error.message));
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getAll(groupdId: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}?groupId=${groupdId}`).pipe(catchError(this.handleError));
  }

  create(data: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl, data).pipe(catchError(this.handleError));
  }

  update(id: number, data: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.baseUrl}/${id}`, data).pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }
}
