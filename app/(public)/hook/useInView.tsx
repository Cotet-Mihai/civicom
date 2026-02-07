'use client'

import { useEffect, useState, RefObject } from "react"

/**
 * Custom hook to detect if a DOM element is visible in the viewport.
 *
 * @param ref - React ref of the element to observe
 * @param threshold - IntersectionObserver threshold (default 0.2)
 * @returns inView - true if the element is in the viewport
 */
export function useInView<T extends HTMLElement | null>(ref: RefObject<T>, threshold: number = 0.2) {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (!ref.current) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold }
        )

        observer.observe(ref.current)

        return () => observer.disconnect()
    }, [ref, threshold])

    return inView
}
