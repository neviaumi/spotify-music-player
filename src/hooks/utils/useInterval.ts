import { useCallback, useState } from 'react';
import { useInterval as useIntervalHook } from 'react-use';

export function useInterval(
  handler: (latestSuccessExecuteTime: number) => unknown,
  delay: number,
  options: { enabled: boolean },
) {
  const { enabled } = options;
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<undefined | Error>(undefined);
  const [latestSuccessExecuteTime, setSuccessExecuteTime] = useState(
    Date.now(),
  );
  const shouldRunInterval = enabled && !running && !error;
  useIntervalHook(
    useCallback(async () => {
      if (running && !error) return;
      setRunning(true);
      try {
        await handler(latestSuccessExecuteTime);
      } catch (e) {
        setError(e);
      } finally {
        setRunning(false);
        setSuccessExecuteTime(Date.now());
      }
    }, [error, handler, running, latestSuccessExecuteTime]),
    shouldRunInterval ? delay : null,
  );
  return { error };
}
