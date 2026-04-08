'use client'

import * as React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

/**
 * Type for gallery item
 */
type GalleryItem = {
    id: string;
    url: string;
};

/**
 * Props for GalleryCarouselWithModal component
 */
type Props = {
    gallery: GalleryItem[];
};

/**
 * Gallery carousel with modal preview
 * - Click image → opens fullscreen dialog
 * - No white bars (object-cover in carousel)
 * - Full image visible in modal (object-contain)
 */
export default function GalleryCarouselWithModal({ gallery }: Props) {
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

    return (
        <>
            <Carousel
                opts={{ align: "start" }}
                className="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm"
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
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            {/* Modal */}
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="max-w-5xl p-0 bg-black/95 border-none flex items-center justify-center">

                    <DialogTitle className="sr-only">Image preview</DialogTitle>

                    {selectedImage && (
                        <div className="flex items-center justify-center w-full h-[80vh] rounded-3xl overflow-hidden">
                            <Image
                                src={`https://bslgppjjtfropjzccetj.supabase.co/storage/v1/object/public/gallery/${selectedImage}`}
                                alt="preview"
                                width={1200}
                                height={800}
                                className="object-contain max-h-full w-auto"
                                unoptimized
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
