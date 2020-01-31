export default abstract class AppError<T = {}> extends Error {
  public code: string;

  public fallbackPath?: string;

  public meta: T;

  protected constructor(code: string, message: string, meta?: T) {
    super(message);
    this.code = `ERR_${code}`.toUpperCase();
    this.meta = (meta || {}) as T;
  }
}
