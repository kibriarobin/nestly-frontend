export interface ApiResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiErrorBody {
  success: false;
  statusCode: number;
  message: string;
  errors?: unknown[];
}