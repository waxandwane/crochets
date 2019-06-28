import { useState, useLayoutEffect } from "react";
import { usePrevious } from "@lib";

const HIDDEN = 'hidden'

export const useScrollBlock = (
  locked: boolean,
  el: HTMLElement = document.body
): void => {
  const previousLocked = usePrevious(locked);
  const [previousStyle, setPreviousStyle] = useState();

  useLayoutEffect(() => {
    if (!locked && previousLocked) {
      if (previousStyle) {
        el.style.overflow = previousStyle;
      }
    }
    if (locked && !previousLocked) {
      const style = window.getComputedStyle(el).overflow;
      setPreviousStyle(style);
      el.style.overflow = HIDDEN;
    }
  }, [locked, previousLocked, el, previousStyle]);
};
