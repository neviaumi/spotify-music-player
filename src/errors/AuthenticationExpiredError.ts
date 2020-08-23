import type { Location } from 'history';

import AppError from './AppError';

export default class AuthenticationExpiredError extends AppError<{
  expiredAt: number;
  location: Location;
  token: string;
}> {
  constructor(token: string, expiredAt: number, location: Location) {
    super('Authentication_Expired', 'access token expired', {
      token,
      expiredAt,
      location,
    });
    this.fallbackPath = '/auth/login';
  }
}
