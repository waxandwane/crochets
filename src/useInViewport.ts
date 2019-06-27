import { useState, useEffect, useRef, MutableRefObject } from "react";
import { usePrevious } from "@lib";

const percentage = [...Array(100).keys()].map(i => i * 0.01);
const defaultOptions = {
    onEnter: null,
    onLeave: null,
    threshold: percentage,
    root: null
};

export interface InViewPortOptions {
    onEnter?: (() => void) | null;
    onLeave?: (() => void) | null;
    threshold?: number | number[];
    root?: Element | null;
}

export const useInViewport = ({
    onEnter = null,
    onLeave = null,
    threshold = percentage,
    root = null
}: InViewPortOptions = defaultOptions): (number | (MutableRefObject<null | Element>))[] => {
    const ref: MutableRefObject<null | Element> = useRef(null);
    const [inViewport, setInViewPort] = useState(0);
    const [visible, setVisible] = useState(false);
    const previousVisibility = usePrevious(visible);

    useEffect(() => {
        if (!previousVisibility && visible) {
            onEnter && onEnter();
        } else if (previousVisibility && !visible) {
            onLeave && onLeave();
        }
    }, [visible, previousVisibility, onEnter, onLeave]);

    useEffect(() => {
        const callback = (entries: IntersectionObserverEntry[]): void => {
            entries.forEach(entry => {
                const newRatio = entry.intersectionRatio;
                setInViewPort(newRatio);
                setVisible(newRatio > 0);
            });
        };

        const options = {
            threshold,
            root
        };

        const observer = new IntersectionObserver(callback, options);
        const el = ref.current;
        el && observer.observe(el);
        return () => {
            el && observer.unobserve(el);
        };
    }, [ref, root, threshold]);

    return [inViewport, ref];
};
