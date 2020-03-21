export default interface IStorage<T, U> {
  readonly client: U;
  getItem(key: string, options?: T): string | null;
  removeItem(key: string, options?: T): void;
  setItem(key: string, value: string, options?: T): void;
}
