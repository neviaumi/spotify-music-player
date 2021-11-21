import { setTimeout } from 'timers/promises';

async function timeoutWithError(timeout) {
  await setTimeout(timeout);
  throw new Error('Async function timeout!');
}

export async function exectutePromiseWithTimeout(promise, timeout) {
  return Promise.race([promise, timeoutWithError(timeout)]);
}
