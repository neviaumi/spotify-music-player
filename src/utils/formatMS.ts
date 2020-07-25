import parseMS from 'parse-ms';

export default function formatMS(ms: number) {
  const { days, hours, minutes } = parseMS(ms);
  const result = [];
  if (days > 0) {
    result.push(`${days} day`);
  }
  if (hours > 0) {
    result.push(`${hours} hr`);
  }
  if (minutes > 0) {
    result.push(`${minutes} min`);
  }

  return result.join(' ');
}
