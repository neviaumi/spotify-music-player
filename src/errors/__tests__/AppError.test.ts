import { AppError } from '../AppError';

class DummyError extends AppError {
  constructor() {
    super('dummy', 'foobar', { foo: 'bar' });
  }
}

it('Should construct a error instance', () => {
  const err = new DummyError();
  expect(err).toBeInstanceOf(AppError);
  expect(err).toBeInstanceOf(Error);
  expect(err.code).toEqual('ERR_DUMMY');
  expect(err.message).toEqual('foobar');
  expect(err.meta).toEqual({ foo: 'bar' });
});
