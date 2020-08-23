import path from 'path';

export default () => {
  const testPath: string = global.jasmine.testPath;
  return path.relative(process.cwd(), path.dirname(testPath));
};
