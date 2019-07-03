import { useState, useRef, useEffect } from 'react';
import { useEvent } from '@lib';

export const useMouse = (
  target: EventTarget = document,
  options: AddEventListenerOptions = { passive: true, capture: false }
) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const frame = useRef(0);

  const handleMouse = (e: MouseEvent) => {
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    });
  };

  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current);
    },
    []
  );

  useEvent('mousemove', handleMouse, target, options);

  return mouse;
};
