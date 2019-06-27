import { useState, useEffect, useRef, MutableRefObject } from "react";

export const useMouseOver = (): (MutableRefObject<EventTarget | null> | boolean)[] => {
  const ref: MutableRefObject<EventTarget | null> = useRef(null)
  const [isOver, setIsOver] = useState(false);

  const handleChange = (val: boolean) => () => setIsOver(val);

  useEffect(() => {
    const el = ref.current;
    el && el.addEventListener("mouseenter", handleChange(true));
    el && el.addEventListener("mouseleave", handleChange(false));

    return () => {
      el && el.removeEventListener("mouseenter", handleChange(true));
      el && el.removeEventListener("mouseleave", handleChange(false));
    };
  }, [ref]);

  return [ref, isOver];
};
