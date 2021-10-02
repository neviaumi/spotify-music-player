import { promises as fs } from 'fs';

import { exectutePromiseWithTimeout } from '../utils/exectutePromiseWithTimeout.js';
import { readStreamContent } from '../utils/readStreamContent.js';

async function writeValueToEnvFile(envFilePath, keyToWrite, envValue) {
  const dotenvContent = await fs.readFile(envFilePath, {
    encoding: 'utf8',
  });
  const newDotEnvContent = dotenvContent
    .split('\n')
    .map(line => {
      const [key, ...rest] = line.split('=');
      return [key, rest.join('=')];
    })
    .map(([key, value]) => {
      if (key === keyToWrite) return [key, envValue];
      return [key, value];
    })
    .filter(([key, value]) => key && value)
    .map(([key, value]) => [key, value].join('='));
  if (!dotenvContent.includes(keyToWrite)) {
    newDotEnvContent.push(`${keyToWrite}=${envValue}`);
  }
  await fs.writeFile(envFilePath, newDotEnvContent);
}

export const command = {
  builder(yargs) {
    yargs.positional('file-path', {
      describe: 'env file path',
    });
    yargs.positional('key-to-set', {
      describe: 'env variable name to add / update',
    });
    yargs.positional('value', {
      describe: 'env variable value to set',
    });
    yargs.middleware(async argv => {
      if (argv.value) return argv;
      const pipedValue = await exectutePromiseWithTimeout(
        readStreamContent(process.stdin),
        30000,
      );
      argv.value = pipedValue.toString('utf-8').trim();
      return argv;
    });
  },
  command: 'set-env-file <file-path> <key-to-set> [value]',
  desc: 'Set / Update env variable on .env file ',
  async handler(argv) {
    const { filePath, keyToSet, value } = argv;
    await writeValueToEnvFile(filePath, keyToSet, value);
    process.exit(0);
  },
};
