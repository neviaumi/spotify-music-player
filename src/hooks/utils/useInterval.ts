import { useCallback, useState } from 'react';
import { useInterval as useIntervalHook } from 'react-use';

export function useInterval(
  handler: () => unknown,
  delay: number,
  options: { enabled: boolean },
) {
  const { enabled } = options;
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<undefined | Error>(undefined);
  const shouldRunInterval = enabled && !running && !error;
  useIntervalHook(
    useCallback(async () => {
      if (running && !error) return;
      setRunning(true);
      try {
        await handler();
      } catch (e) {
        setError(e);
      } finally {
        setRunning(false);
      }
    }, [error, handler, running]),
    shouldRunInterval ? delay : null,
  );
  return { error };
}
