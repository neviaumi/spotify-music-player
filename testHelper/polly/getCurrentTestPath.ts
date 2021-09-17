import path from 'path';

export function getCurrentTestPath() {
  const testPath = '';
  return path.relative(process.cwd(), path.dirname(testPath));
}
