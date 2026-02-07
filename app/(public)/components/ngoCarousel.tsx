"use client"

import { useEffect, useRef } from "react"
import { ExternalLink, Heart, Users, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const ngos = [
  {
    name: "Crucea Rosie Romana",
    icon: Heart,
    description:
      "Organizatie umanitara dedicata protectiei si ajutorarii persoanelor vulnerabile din intreaga tara.",
    url: "https://crucearosie.ro",
  },
  {
    name: "Salvati Copiii",
    icon: Users,
    description:
      "Organizatie care lupta pentru drepturile copiilor si ofera suport educativ si medical copiilor defavorizati.",
    url: "https://salvaticopiiromania.ro",
  },
  {
    name: "WWF Romania",
    icon: Globe,
    description:
      "Organizatie de conservare a naturii care protejeaza biodiversitatea si promoveaza dezvoltarea durabila.",
    url: "https://wwf.ro",
  },
  {
    name: "Habitat for Humanity",
    icon: Shield,
    description:
      "Organizatie globala care construieste case si comunitati pentru familii aflate in nevoie.",
    url: "https://habitat.ro",
  },
  {
    name: "Teach for Romania",
    icon: Users,
    description:
      "Program care aduce tineri profesionisti talentati in comunitatile educationale defavorizate.",
    url: "https://teachforromania.org",
  },
]

export function NgoCarousel() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const animatedEls = entry.target.querySelectorAll("[data-animate]")
            animatedEls.forEach((el, i) => {
              const htmlEl = el as HTMLElement
              htmlEl.style.animationDelay = `${i * 100}ms`
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
      id="ong-uri"
      className="bg-muted/50 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 text-center">
          <span
            data-animate
            className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary opacity-0"
          >
            Parteneri de incredere
          </span>
          <h2
            data-animate
            className="text-3xl font-bold tracking-tight text-foreground opacity-0 md:text-4xl lg:text-5xl"
          >
            Asociatii in care avem incredere
          </h2>
          <p
            data-animate
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground opacity-0 lg:text-lg"
          >
            Colaboram cu organizatii verificate, transparente si cu impact real
            in comunitate.
          </p>
        </div>

        <div data-animate className="opacity-0">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="mx-auto w-full max-w-6xl"
          >
            <CarouselContent className="-ml-4">
              {ngos.map((ngo) => {
                const IconComp = ngo.icon
                return (
                  <CarouselItem
                    key={ngo.name}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="group h-full border-border/60 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                      <CardHeader>
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <IconComp className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg text-card-foreground">
                          {ngo.name}
                        </CardTitle>
                        <CardDescription className="leading-relaxed">
                          {ngo.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1" />
                      <CardFooter className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5 border-primary/20 text-primary hover:bg-accent hover:text-accent-foreground bg-transparent"
                          asChild
                        >
                          <a
                            href={ngo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Afla mai mult
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5"
                        >
                          <Heart className="h-3.5 w-3.5" />
                          Doneaza
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex -left-14 border-border bg-card text-foreground hover:bg-accent" />
            <CarouselNext className="hidden lg:flex -right-14 border-border bg-card text-foreground hover:bg-accent" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
