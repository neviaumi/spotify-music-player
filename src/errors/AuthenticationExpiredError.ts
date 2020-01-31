import AppError from './AppError';

export default class AuthenticationExpiredError extends AppError<{
  token: string;
  expiredAt: number;
}> {
  constructor(token: string, expiredAt: number) {
    super('Authentication_Expired', 'access token expired', {
      token,
      expiredAt,
    });
    this.fallbackPath = '/auth/login';
  }
}
