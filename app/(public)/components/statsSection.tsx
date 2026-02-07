"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, Users, Heart, MapPin } from "lucide-react"

const stats = [
  {
    icon: Calendar,
    value: 1240,
    suffix: "+",
    label: "Evenimente organizate",
  },
  {
    icon: Users,
    value: 8500,
    suffix: "+",
    label: "Voluntari activi",
  },
  {
    icon: Heart,
    value: 320,
    suffix: "",
    label: "ONG-uri partenere",
  },
  {
    icon: MapPin,
    value: 42,
    suffix: "",
    label: "Orase acoperite",
  },
]

function AnimatedCounter({
  target,
  suffix,
  inView,
}: {
  target: number
  suffix: string
  inView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)
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
  }, [inView, target])

  return (
    <span>
      {count.toLocaleString("ro-RO")}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            const animatedEls = entry.target.querySelectorAll("[data-animate]")
            animatedEls.forEach((el, i) => {
              const htmlEl = el as HTMLElement
              htmlEl.style.animationDelay = `${i * 150}ms`
              htmlEl.classList.add("animate-count-up")
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
    <section ref={sectionRef} className="bg-primary py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat) => {
            const IconComp = stat.icon
            return (
              <div
                key={stat.label}
                data-animate
                className="flex flex-col items-center text-center opacity-0"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/15 text-primary-foreground">
                  <IconComp className="h-6 w-6" />
                </div>
                <span className="text-3xl font-bold text-primary-foreground md:text-4xl">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                </span>
                <span className="mt-1 text-sm font-medium text-primary-foreground/80">
                  {stat.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
