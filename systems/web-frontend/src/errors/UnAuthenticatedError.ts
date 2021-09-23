import { AppError } from './AppError';

export class UnAuthenticatedError extends AppError<{
  orgError?: Error;
}> {
  constructor(orgError?: Error) {
    super('UnAuthenticated', 'UnAuthenticated', {
      orgError: orgError,
    });
  }
}
