declare global {
  namespace NodeJS {
    interface Global {
      MutationObserver: any;
      jasmine: { testPath: string };
    }
  }
}
