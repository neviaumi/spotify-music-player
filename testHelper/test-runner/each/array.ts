export function array<T extends Array<unknown> = unknown[]>(
  records: T[],
): (callback: (...record: T) => void) => void {
  return callback => {
    records.forEach(record => {
      callback(...record);
    });
  };
}
