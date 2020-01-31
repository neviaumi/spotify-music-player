import AppError from './AppError';

export default class AuthenticationCallbackError extends AppError<{
  error: string;
}> {
  constructor(error: string) {
    super('Authentication_Callback', 'access token expired', {
      error,
    });
  }
}
