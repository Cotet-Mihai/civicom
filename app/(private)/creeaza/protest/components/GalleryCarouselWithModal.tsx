'use client'

import * as React from "react";
import Image from "next/image";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"


type GalleryItem = {
    id: string;
    url: string;
};


type Props = {
    gallery: GalleryItem[];
};


export default function GalleryCarouselWithModal({ gallery }: Props) {
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

    return (
        <>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 3000,
                    }),
                ]}
                className="w-full"

            >
                <CarouselContent>
                    {gallery.map((item) => (
                        <CarouselItem
                            key={item.id}
                            className="basis-1/2 lg:basis-1/3"
                        >
                            <div className="p-1">
                                <div
                                    className="relative w-full aspect-square overflow-hidden rounded-xl cursor-pointer"
                                    onClick={() => setSelectedImage(item.url)}
                                >
                                    <Image
                                        src={`https://bslgppjjtfropjzccetj.supabase.co/storage/v1/object/public/gallery/${item.url}`}
                                        alt="gallery"
                                        fill
                                        sizes="50vw, 33vw"
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent
                    className="
                      p-0
                      border-none
                      bg-transparent
                      shadow-none
                      max-w-none
                      w-fit
                      h-fit
                      flex
                      items-center
                      justify-center
                    "
                    showCloseButton={false}
                >
                    <DialogTitle className="sr-only">Vizualizare imagine</DialogTitle>

                    {selectedImage && (
                        <div className="flex items-center justify-center">
                            <Image
                                src={`https://bslgppjjtfropjzccetj.supabase.co/storage/v1/object/public/gallery/${selectedImage}`}
                                alt="Preview imagine"
                                width={1600}
                                height={1000}
                                className="
                                max-h-[85vh]
                                w-auto
                                h-auto
                                object-contain
                                rounded-3xl md:rounded-3xl
                                shadow-2xl
                                animate-in fade-in zoom-in-95 duration-300
                                "
                                unoptimized
                                priority
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
