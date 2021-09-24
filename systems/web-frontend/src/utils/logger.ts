/* eslint-disable no-console */

export function debug(message: string, data?: any) {
  const mode = import.meta.env.MODE;
  if (mode === 'development')
    return console.log({
      message,
      ...data,
    });
  throw new Error(`Debug should not call in env - ${mode}`);
}
