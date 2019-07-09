import { useEvent } from '@lib';
import { useCallback, useState } from 'react';

export const useMouse = (
  target: EventTarget = document,
  { passive, capture }: AddEventListenerOptions = {
    passive: true,
    capture: false,
  }
) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const handleMouse = useCallback(
    (e: MouseEvent) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    },
    [setMouse]
  );

  useEvent('mousemove', handleMouse, target, { passive, capture });

  return mouse;
};
