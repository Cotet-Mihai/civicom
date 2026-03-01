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
export function useAnimateOnIntersect(delayStep: number = 100): RefObject<HTMLDivElement | null> {
    const ref: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
    const inView: boolean = useInView(ref);

    useEffect(() => {
        if (!inView || !ref.current) return;

        const animatedEls: NodeListOf<HTMLDivElement> = ref.current.querySelectorAll<HTMLDivElement>("[data-animate]");
        animatedEls.forEach((el: HTMLDivElement, i: number): void => {
            el.style.animationDelay = `${i * delayStep}ms`;
            el.classList.add("animate-fade-in-up");
        });
    }, [inView, delayStep]);

    return ref;
}
