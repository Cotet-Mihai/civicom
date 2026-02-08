"use client"

import { Button } from "@/components/ui/button";
import {
    Card, CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {ngos} from '@/data/seedHome';
import Image from "next/image";
import Link from "next/link";
import {BadgeCheck} from 'lucide-react';
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {useAnimateOnIntersect} from "@/app/(public)/hook/useAnimateOnIntersect";

export function NgoCarousel() {
    const sectionRef = useAnimateOnIntersect();

    return (
        <section
            ref={sectionRef}
            id="ong-uri"
            className="bg-muted/50 py-20 lg:py-28 h-screen scroll-mt-16"
        >
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="mb-12 text-center">
                    <h2
                        data-animate
                        className="opacity-0 flex flex-col"
                    >
                        <div>
                            <span className={'text-4xl lg:text-7xl font-black text-primary'}>✨ASOCIAȚII</span>
                            <span className={'text-xl lg:text-3xl font-bold text-secondary'}>ÎN CARE</span>
                        </div>
                        <div>
                            <span className={'text-2xl lg:text-4xl font-bold text-primary'}>AVEM</span>
                            <span className={'text-4xl lg:text-7xl font-black text-secondary'}>ÎNCREDERE✨</span>
                        </div>
                    </h2>
                    <p
                        data-animate
                        className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground opacity-0 lg:text-lg"
                    >
                        Colaborăm cu organizații verificate, transparente și cu impact real în comunitate.
                    </p>
                </div>

                <div data-animate className="opacity-0">
                    <Carousel
                        className="mx-auto w-full max-w-6xl"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 4000,
                            }),
                        ]}
                    >
                        <CarouselContent className="-ml-4">
                            {ngos.map((ngo) => {
                                return (
                                    <CarouselItem
                                        key={ngo.id}
                                        className="pl-4 md:basis-1/2 lg:basis-1/3"
                                    >
                                        <Card className="group relative mx-auto w-full max-w-sm h-100 pt-0 overflow-hidden">
                                            <div className="absolute inset-0 z-30 aspect-video bg-black/3" />

                                            <div className="relative w-full aspect-video overflow-hidden">
                                                <Image
                                                    src={ngo.logo}
                                                    alt={ngo.name + ' Siglă'}
                                                    fill
                                                    className="p-10 object-contain transition-transform duration-300 ease-out group-hover:scale-110"
                                                />
                                            </div>

                                            <CardHeader>
                                                <CardAction>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <BadgeCheck color={'#1fad5a'}/>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className={'font-bold'}>Organizație Verificată Oficial</p>
                                                        </TooltipContent>
                                                    </Tooltip>

                                                </CardAction>
                                                <CardTitle>{ngo.name}</CardTitle>
                                                <CardDescription>
                                                    {ngo.description}
                                                </CardDescription>
                                            </CardHeader>

                                            <CardFooter className="mt-auto flex justify-between">
                                                <Button
                                                    variant="outline"
                                                    className="font-semiboldtransition-all duration-200 ease-out hover:bg-red-50 hover:border-red-100 hover:text-red-500"
                                                >
                                                    Donează ❤
                                                </Button>
                                                <Link href={ngo.url} target={'_blank'}>
                                                    <Button className="font-semibold" variant={'secondary'}>Află mai multe</Button>
                                                </Link>
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
