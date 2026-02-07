"use client"

import { stats } from "@/data/seedHome";
import { useAnimateOnIntersect } from "@/app/(public)/hook/useAnimateOnIntersect";
import { useInView } from "../hook/useInView";
import { useCountUp } from "@/app/(public)/hook/useCountUp";

interface AnimatedCounterProps {
    target: number
    suffix: string
    inView: boolean
}

export function AnimatedCounter({ target, suffix, inView }: AnimatedCounterProps) {
    const count = useCountUp(target, inView);

    return (
        <span>
            {count.toLocaleString("ro-RO")}
            {suffix}
        </span>
    )
}

export function StatsSection() {
    const sectionRef = useAnimateOnIntersect(0.2, 150);
    const inView = useInView(sectionRef, 0.2);

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
