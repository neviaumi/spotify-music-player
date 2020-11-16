declare global {
  namespace NodeJS {
    interface Global {
      jasmine: { testPath: string };
    }
  }
}
