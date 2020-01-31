import AppError from './AppError';

export default class UnAuthenticatedError extends AppError {
  constructor() {
    super('UnAuthenticated', 'UnAuthenticated');
    this.fallbackPath = '/auth/login';
  }
}
