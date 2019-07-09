import { useEffect, useMemo } from 'react';

export const useEvent = (
  eventName: string,
  callback: (e: Event) => void,
  target: EventTarget = window,
  { passive, capture }: AddEventListenerOptions = {
    passive: true,
    capture: false,
  }
): void => {
  const eventOptions = useMemo(() => ({ passive, capture }), [
    passive,
    capture,
  ]);
  useEffect(() => {
    target.addEventListener(eventName, callback, eventOptions);
    return () => {
      target.removeEventListener(eventName, callback);
    };
  }, [target, eventName, callback, eventOptions]);
};
