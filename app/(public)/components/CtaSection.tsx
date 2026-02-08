"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import {useAnimateOnIntersect} from "@/app/(public)/hook/useAnimateOnIntersect";

export function CtaSection() {
    const sectionRef = useAnimateOnIntersect();

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
