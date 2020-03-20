import { Location } from 'history';

import AppError from './AppError';

export default class AuthenticationExpiredError extends AppError<{
  token: string;
  expiredAt: number;
  location: Location;
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
