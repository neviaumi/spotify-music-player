export function objects<T = Record<string, unknown>>(
  records: [(keyof T)[], ...unknown[][]],
): (callback: (record: T) => void) => void {
  const [headers, ...items] = records;
  return callback => {
    items
      .map(row => row.map((col, colIndex) => [headers[colIndex], col]))
      .map(row => Object.fromEntries(row))
      .forEach(row => callback(row));
  };
}
