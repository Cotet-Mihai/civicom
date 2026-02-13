"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    color: string
    size: number
    rotation: number
    rotationSpeed: number
    opacity: number
    shape: "rect" | "circle"
}

function randomBetween(a: number, b: number) {
    return a + Math.random() * (b - a)
}

const COLORS = [
    "hsl(152, 60%, 42%)",
    "hsl(152, 60%, 55%)",
    "hsl(152, 40%, 70%)",
    "hsl(45, 90%, 55%)",
    "hsl(200, 70%, 55%)",
    "hsl(340, 70%, 60%)",
    "hsl(270, 60%, 60%)",
    "hsl(20, 80%, 55%)",
]

export function Confetti() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const animationRef = useRef<number>(0)

    const createParticles = useCallback((width: number, height: number) => {
        const particles: Particle[] = []
        const count = 120

        for (let i = 0; i < count; i++) {
            const fromLeft = i < count / 2
            particles.push({
                x: fromLeft ? -10 : width + 10,
                y: randomBetween(height * 0.1, height * 0.5),
                vx: fromLeft ? randomBetween(3, 9) : randomBetween(-9, -3),
                vy: randomBetween(-8, -2),
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                size: randomBetween(5, 10),
                rotation: randomBetween(0, Math.PI * 2),
                rotationSpeed: randomBetween(-0.15, 0.15),
                opacity: 1,
                shape: Math.random() > 0.5 ? "rect" : "circle",
            })
        }

        return particles
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resize()
        window.addEventListener("resize", resize)

        particlesRef.current = createParticles(canvas.width, canvas.height)

        const gravity = 0.18
        const friction = 0.985

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            let alive = false

            for (const p of particlesRef.current) {
                p.vy += gravity
                p.vx *= friction
                p.x += p.vx
                p.y += p.vy
                p.rotation += p.rotationSpeed

                if (p.y > canvas.height * 0.6) {
                    p.opacity -= 0.015
                }

                if (p.opacity <= 0) continue

                alive = true

                ctx.save()
                ctx.translate(p.x, p.y)
                ctx.rotate(p.rotation)
                ctx.globalAlpha = Math.max(0, p.opacity)
                ctx.fillStyle = p.color

                if (p.shape === "rect") {
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
                } else {
                    ctx.beginPath()
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
                    ctx.fill()
                }

                ctx.restore()
            }

            if (alive) {
                animationRef.current = requestAnimationFrame(animate)
            }
        }

        const timeout = setTimeout(() => {
            animate()
        }, 400)

        return () => {
            clearTimeout(timeout)
            cancelAnimationFrame(animationRef.current)
            window.removeEventListener("resize", resize)
        }
    }, [createParticles])

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-50"
            aria-hidden="true"
        />
    )
}
