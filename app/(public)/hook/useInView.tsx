'use client'

import { useEffect, useState, RefObject } from "react"

export function useInView<T extends HTMLElement | null>(ref: RefObject<T>, threshold: number = 0.2): boolean {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref, threshold]);

    return inView;
}
