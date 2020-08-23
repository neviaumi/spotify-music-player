import path from 'path';

export default () => {
  // @ts-expect-error
  const testPath: string = global.jasmine.testPath;
  return path.relative(process.cwd(), path.dirname(testPath));
};
