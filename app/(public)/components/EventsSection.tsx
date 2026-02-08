"use client"

import {events} from "@/data/seedHome"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {EventCard} from "@/app/(public)/components/EventCard";
import {useAnimateOnIntersect} from "@/app/(public)/hook/useAnimateOnIntersect";

export function EventsSection() {
    const sectionRef = useAnimateOnIntersect();

    return (
        <section
            id={'evenimente'}
            ref={sectionRef}
            className="bg-muted/50 py-20 lg:py-28 min-h-screen"
        >
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="flex flex-col">
                        <div>
                            <span
                                data-animate
                                className="text-3xl font-black text-primary lg:text-7xl opacity-0"
                            >
                                ✨EVENIMENTE
                            </span>
                            <span
                                data-animate
                                className="text-xl font-extrabold text-secondary lg:text-3xl opacity-0"
                            >
                                CARE
                            </span>
                        </div>
                        <div>
                            <span
                                data-animate
                                className="text-sm font-black text-secondary  lg:text-6xl opacity-0"
                            >
                                SCHIMBĂ
                            </span>
                            <span
                                data-animate
                                className="text-2xl font-extrabold text-primary lg:text-4xl opacity-0"
                            >
                                COMUNITATEA
                            </span>
                            <span
                                data-animate
                                className="text-4xl font-black text-primary lg:text-7xl opacity-0"
                            >
                                ✨
                            </span>
                        </div>
                    </h2>
                    <p
                        data-animate
                        className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg opacity-0"
                    >
                        Descoperă evenimentele organizate de ONG-uri verificate și implică-te activ în comunitate.
                    </p>
                </div>

                {/* Carousel */}
                <Carousel
                    data-animate
                    className="mx-auto w-full max-w-6xl opacity-0"
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 5000,
                        }),
                    ]}
                >
                    <CarouselContent className="-ml-4">
                        {events.map((event) => (
                            <CarouselItem
                                key={event.id}
                                className="pl-4 md:basis-1/2 lg:basis-1/3"
                            >
                                <EventCard event={event} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-14 hidden border-border bg-card text-foreground hover:bg-accent lg:flex" />
                    <CarouselNext className="-right-14 hidden border-border bg-card text-foreground hover:bg-accent lg:flex" />
                </Carousel>
            </div>
        </section>
    );
}
