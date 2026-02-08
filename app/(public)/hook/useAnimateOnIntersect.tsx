'use client'

import { useEffect, useRef } from "react"

/**
 * Custom React hook that automatically animates child elements when they enter the viewport.
 *
 * Elements inside the container with the `data-animate` attribute will receive the
 * `animate-fade-in-up` class and a staggered animation delay based on their order.
 *
 * @param threshold - IntersectionObserver threshold to trigger animations (default: 0.1)
 * @param delayStep - Delay in milliseconds between staggered animations for each element (default: 100)
 * @returns ref - A React ref that should be attached to the container element
 */
export function useAnimateOnIntersect(
    threshold: number = 0.1,
    delayStep: number = 100
) {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!ref.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const animatedEls = entry.target.querySelectorAll("[data-animate]")
                        animatedEls.forEach((el, i) => {
                            const htmlEl = el as HTMLElement
                            htmlEl.style.animationDelay = `${i * delayStep}ms`
                            htmlEl.classList.add("animate-fade-in-up")
                        })
                        observer.unobserve(entry.target)
                    }
                }
            },
            { threshold }
        )

        observer.observe(ref.current)

        return () => observer.disconnect()
    }, [threshold, delayStep])

    return ref
}
