/* eslint-disable no-console */

export function debug(message: string, data?: any) {
  if (process.env.NODE_ENV === 'development')
    return console.log(message, data ? JSON.stringify(data, null, 4) : data);
  throw new Error(`Debug should not call in env - ${process.env.NODE_ENV}`);
}
