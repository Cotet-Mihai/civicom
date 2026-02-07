"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
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
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <h2
          data-animate
          className="text-3xl font-bold tracking-tight text-foreground opacity-0 md:text-4xl lg:text-5xl"
        >
          Pregatit sa faci diferenta?
        </h2>
        <p
          data-animate
          className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground opacity-0 lg:text-lg"
        >
          Alatura-te comunitatii Civicom si contribuie la schimbarea pe care
          vrei sa o vezi in lume. Fiecare actiune conteaza.
        </p>
        <div
          data-animate
          className="mt-8 flex flex-col items-center justify-center gap-3 opacity-0 sm:flex-row"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8"
          >
            Incepe acum
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary/30 text-primary hover:bg-accent hover:text-accent-foreground px-8 bg-transparent"
          >
            Afla mai multe
          </Button>
        </div>
      </div>
    </section>
  )
}
