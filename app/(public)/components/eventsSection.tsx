"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"

const events = [
  {
    title: "Curatenia de Primavara",
    type: "Activitate comunitara",
    date: "15 Martie 2026",
    location: "Parcul Herastrau, Bucuresti",
    volunteers: 45,
    color: "bg-primary",
  },
  {
    title: "Maraton pentru Educatie",
    type: "Eveniment caritabil",
    date: "22 Martie 2026",
    location: "Piata Universitatii, Bucuresti",
    volunteers: 120,
    color: "bg-secondary",
  },
  {
    title: "Petitie Spatii Verzi",
    type: "Petitie",
    date: "1 Aprilie 2026",
    location: "Online + Cluj-Napoca",
    volunteers: 890,
    color: "bg-primary",
  },
]

export function EventsSection() {
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
    <section
      ref={sectionRef}
      id="evenimente"
      className="bg-background py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <span
              data-animate
              className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary opacity-0"
            >
              Ultimele evenimente
            </span>
            <h2
              data-animate
              className="text-3xl font-bold tracking-tight text-foreground opacity-0 md:text-4xl lg:text-5xl"
            >
              Implica-te in comunitate
            </h2>
          </div>
          <Button
            data-animate
            variant="outline"
            className="gap-2 border-primary/30 text-primary hover:bg-accent hover:text-accent-foreground opacity-0 bg-transparent"
          >
            Vezi toate evenimentele
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event.title}
              data-animate
              className="group border-border/60 bg-card opacity-0 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={`${event.color === "bg-primary" ? "bg-accent text-accent-foreground" : "bg-secondary/20 text-secondary-foreground"} text-xs font-medium`}
                  >
                    {event.type}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-card-foreground group-hover:text-primary transition-colors">
                  {event.title}
                </CardTitle>
                <CardDescription className="flex flex-col gap-1.5 pt-2">
                  <span className="flex items-center gap-2 text-sm">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-2 text-sm">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    {event.volunteers} voluntari inscrisi
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1" />
              <CardFooter>
                <Button
                  size="sm"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Inscrie-te
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
