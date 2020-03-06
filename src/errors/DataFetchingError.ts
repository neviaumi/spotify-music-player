import AppError from './AppError';

export default class DataFetchingError extends AppError<{ orgError: Error }> {
  constructor(orgError: Error) {
    super('DataFetching', 'Unable fetching data', {
      orgError: orgError,
    });
  }
}
