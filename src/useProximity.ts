import { useState, useRef, useLayoutEffect, MutableRefObject } from 'react';
import { useMouse } from '@lib';

export const useProximity = ({ max, min } = { max: 200, min: 0 }) => {
  const ref: MutableRefObject<HTMLElement | undefined> = useRef();
  const [closeness, setCloseness] = useState({ t: 0, x: 0, y: 0 });
  const mousePos = useMouse();
  const frame = useRef(0);

  useLayoutEffect(() => {
    if (ref.current) {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const el = ref.current as HTMLElement;
        if (!el) return;
        const centerPos = {
          x: el.offsetLeft + el.offsetWidth / 2,
          y: el.offsetTop + el.offsetHeight / 2,
        };

        const distX = centerPos.x - mousePos.x;
        const distY = centerPos.y - mousePos.y;
        const dist = Math.hypot(distX, distY);
        if (dist > max) {
          setCloseness({ x: 0, y: 0, t: 0 });
        } else if (dist < min) {
          setCloseness({ x: 0, y: 0, t: 1 });
        } else {
          const diffed = dist - min;
          const range = max - min;
          const res = 1 - diffed / range;
          const diffedX = distX - min;
          const diffedY = distY - min;
          const resX = diffedX / range;
          const resY = diffedY / range;
          setCloseness({ x: resX, y: resY, t: res });
        }
      });
    }

    return () => {
      cancelAnimationFrame(frame.current);
    };
  }, [mousePos, ref, max, min]);

  return [ref, closeness];
};
