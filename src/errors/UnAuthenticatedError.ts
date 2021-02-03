import type { Location } from 'history';

import { AppError } from './AppError';

export class UnAuthenticatedError extends AppError<{
  location: Location;
}> {
  constructor(location: Location) {
    super('UnAuthenticated', 'UnAuthenticated', { location });
  }
}
