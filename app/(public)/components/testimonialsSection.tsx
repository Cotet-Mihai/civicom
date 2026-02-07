"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Ana Popescu",
    role: "Voluntar, Crucea Rosie",
    text: "Civicom mi-a schimbat perspectiva asupra voluntariatului. Am gasit evenimente relevante langa mine si am cunoscut oameni extraordinari. Platforma este intuitiva si ma motiveaza sa contribui mai mult.",
    initials: "AP",
  },
  {
    name: "Mihai Ionescu",
    role: "Coordonator, Salvati Copiii",
    text: "Ca organizatie, Civicom ne-a ajutat enorm in gestionarea voluntarilor. Am reusit sa atragem de trei ori mai multi voluntari decat inainte. Este un instrument indispensabil pentru orice ONG.",
    initials: "MI",
  },
  {
    name: "Elena Dumitrescu",
    role: "Voluntar activ",
    text: "Am participat la peste 20 de evenimente prin Civicom. Fiecare experienta a fost organizata impecabil si am simtit ca fac o diferenta reala in comunitatea mea. Recomand din toata inima!",
    initials: "ED",
  },
]

export function TestimonialsSection() {
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
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-muted/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 text-center">
          <span
            data-animate
            className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary opacity-0"
          >
            Testimoniale
          </span>
          <h2
            data-animate
            className="text-3xl font-bold tracking-tight text-foreground opacity-0 md:text-4xl lg:text-5xl"
          >
            Ce spun voluntarii nostri
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              data-animate
              className="border-border/60 bg-card opacity-0 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-6">
                <Quote className="mb-4 h-8 w-8 text-primary/30" />
                <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
