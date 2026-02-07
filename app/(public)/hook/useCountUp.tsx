'use client'

import { useEffect, useState } from "react"

/**
 * Custom hook for animating a number from 0 to a target value over a duration.
 *
 * @param target - the final number to reach
 * @param inView - whether the animation should start
 * @param duration - animation duration in milliseconds (default 2000)
 * @returns count - the current animated number
 */
export function useCountUp(target: number, inView: boolean, duration: number = 2000) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!inView) return

        let start = 0
        const increment = target / (duration / 16) // aproximativ 60fps
        const timer = setInterval(() => {
            start += increment
            if (start >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)

        return () => clearInterval(timer)
    }, [inView, target, duration])

    return count
}
