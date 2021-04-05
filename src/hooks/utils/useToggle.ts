import { useCallback, useState } from 'react';

export function useToggle(): [boolean, () => void] {
  const [toggleStatus, setToggleValue] = useState(false);
  return [
    toggleStatus,
    useCallback(() => setToggleValue(preValue => !preValue), []),
  ];
}
