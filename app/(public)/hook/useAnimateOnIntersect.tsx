'use client'

import {useRef, useEffect, RefObject} from "react";
import { useInView } from "./useInView";

/**
 * Custom React hook that animates child elements with `data-animate` when the container enters the viewport.
 *
 * Uses the `useInView` hook to detect visibility.
 *
 * @param delayStep - Delay in milliseconds between staggered animations for each element (default: 100)
 */
export function useAnimateOnIntersect(delayStep: number = 100): RefObject<HTMLElement | null> {
    const ref: RefObject<HTMLElement | null> = useRef<HTMLElement>(null);
    const inView: boolean = useInView(ref);

    useEffect(() => {
        if (!inView || !ref.current) return;

        const animatedEls: NodeListOf<HTMLElement> = ref.current.querySelectorAll<HTMLElement>("[data-animate]");
        animatedEls.forEach((el: HTMLElement, i: number): void => {
            el.style.animationDelay = `${i * delayStep}ms`;
            el.classList.add("animate-fade-in-up");
        });
    }, [inView, delayStep]);

    return ref;
}
