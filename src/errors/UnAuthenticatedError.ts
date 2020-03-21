import { Location } from 'history';

import AppError from './AppError';

export default class UnAuthenticatedError extends AppError<{
  location: Location;
}> {
  constructor(location: Location) {
    super('UnAuthenticated', 'UnAuthenticated', { location });
    this.fallbackPath = '/auth/login';
  }
}
