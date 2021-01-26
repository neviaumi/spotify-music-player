import { getCurrentTestPath } from '../getCurrentTestPath';

it('should get current test path', () => {
  const currentAbsDir = __dirname;
  const testPath = getCurrentTestPath();
  expect(currentAbsDir.includes(testPath)).toBeTruthy();
});
