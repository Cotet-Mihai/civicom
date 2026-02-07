"use client"

import {useEffect, useRef} from "react"
import Image from "next/image"
import {Button} from "@/components/ui/button"
import {ArrowRight, Calendar} from "lucide-react"

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const animatedEls = entry.target.querySelectorAll("[data-animate]")
                        animatedEls.forEach((el, i) => {
                            const htmlEl = el as HTMLElement
                            htmlEl.style.animationDelay = `${i * 150}ms`
                            htmlEl.classList.add("animate-fade-in-up")
                        })
                        observer.unobserve(entry.target)
                    }
                }},
            { threshold: 0.1 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-background"
        >
            {/* Subtle background decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5" />
                <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-secondary/10" />
            </div>

            <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 lg:flex-row lg:gap-16 lg:px-8">
                {/* Text content */}
                <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">

                    <h1 className="max-w-2xl">

                        <span
                            data-animate
                            className="block text-2xl font-medium leading-tight text-green-600 opacity-0 md:text-4xl"
                        >
                            Găsește evenimente,
                        </span>

                        <span
                            data-animate
                            className="block text-4xl font-bold uppercase leading-none tracking-tight text-primary opacity-0 md:text-8xl lg:text-6xl"
                        >
                            FII SCHIMBAREA,
                        </span>

                        <span
                            data-animate
                            className="block text-4xl font-medium leading-tight text-green-700 opacity-0 md:text-5xl text-right"
                        >
                            fă voluntariat.
                        </span>

                    </h1>
                    <p
                        data-animate
                        className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground opacity-0 lg:text-sm"
                    >
                        Aducem voluntari, ONG-uri și instituții împreună pentru evenimente, petiții și donații.
                        Descoperă, implică-te și susține cauze care contează. ✨
                    </p>
                    <div
                        data-animate
                        className="mt-8 flex flex-col gap-3 opacity-0 sm:flex-row"
                    >
                        <Button
                            size="lg"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6"
                        >
                            Descoperă evenimente
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="gap-2 border-primary/30 text-primary hover:bg-accent hover:text-accent-foreground px-6 bg-transparent"
                        >
                            <Calendar className="h-4 w-4" />
                            Creează un eveniment
                        </Button>
                    </div>
                </div>

                {/* Hero image */}
                <div
                    data-animate
                    className="flex flex-1 items-center justify-center opacity-0"
                >
                    <div className="relative">
                        <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl" />
                        <Image
                            src="/images/home_image.webp"
                            alt="Sigla Civicom - Mâini ridicate ținând o inimă verde"
                            width={460}
                            height={460}
                            className="relative rounded-2xl object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
