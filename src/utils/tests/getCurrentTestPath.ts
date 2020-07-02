import path from 'path';

export default () => {
  const testPath: string = (global as any).jasmine.testPath;
  return path.relative(process.cwd(), path.dirname(testPath));
};
