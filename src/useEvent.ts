import { useEffect } from "react";

export const useEvent = (
    eventName: string,
    callback: (e: Event) => void,
    target: EventTarget = window,
    options: AddEventListenerOptions = { passive: true }
): void => {
    useEffect(() => {
        target.addEventListener(eventName, callback, options);
        return () => {
            target.removeEventListener(eventName, callback);
        };
    }, [target, eventName, callback, options]);
};
