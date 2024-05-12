export interface ApiError {
  location: string;
  msg: string;
  path: string;
  type:string
  value: string
}

export interface ApiErrorResponse {
  errors: ApiError[];
}
