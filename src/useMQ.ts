import { useState, useEffect, useMemo, useCallback } from "react";

export interface MQSizes {
  [MediaQueryName: string]: number
}

export const useMQ = (sizes: MQSizes): string => {
  const [currentMQ, setCurrentMQ] = useState("COUCOU");
  const onlyWidths = useMemo(() => Object.values(sizes).sort((a, b) => a - b), [
    sizes
  ]);

  const onResize = useCallback(
    (): void => {
      const width = window.innerWidth;
      const smallestSize = onlyWidths.find(size => width <= size);
      const nameOfSmallestSize = Object.keys(sizes).find(
        name => sizes[name] === smallestSize
      ) || Object.keys(sizes)[0];
      setCurrentMQ(nameOfSmallestSize);
    },
    [onlyWidths, sizes],
  )

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return currentMQ;
};
