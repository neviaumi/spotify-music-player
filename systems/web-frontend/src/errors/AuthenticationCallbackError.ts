import { AppError } from './AppError';

export class AuthenticationCallbackError extends AppError<{
  error: string;
}> {
  constructor(error: string) {
    super('Authentication_Callback', error, {
      error,
    });
  }
}
