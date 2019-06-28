import { useEffect, useRef, MutableRefObject } from 'react';

export const usePrevious = <T>(currentVal: T): T | null => {
  const ref: MutableRefObject<T | null> = useRef(null);

  useEffect((): void => {
    ref.current = currentVal;
  }, [currentVal]);

  return ref.current;
};
