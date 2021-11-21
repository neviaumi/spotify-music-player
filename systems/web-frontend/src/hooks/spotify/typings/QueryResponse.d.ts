interface IQueryResponse<T> {
  data: T;
}
export type QueryResponse<T> = IQueryResponse<T> | undefined;
