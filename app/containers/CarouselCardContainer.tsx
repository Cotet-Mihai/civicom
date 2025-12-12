import CarouselCard from "@/app/components/CarouselCard";
import { trustedOngs } from "@/lib/trustedOng";
import Image from "next/image";
import React from "react";
import {CarouselCardContainerProps, Items} from "@/types/carouselCard";

const ongExtras: Record<number, { width: number; height: number }> = {
    1: { width: 500, height: 500 },
    2: { width: 400, height: 400 },
    3: { width: 400, height: 400 },
    4: { width: 280, height: 280 },
    5: { width: 350, height: 350 },
    6: { width: 300, height: 300 },
};

export default function CarouselCardContainer({ width }: CarouselCardContainerProps) {
    const items: Items[] = trustedOngs
        .filter((ong) => ong.id !== 6)
        .map((ong): Items => ({
            id: ong.id,
            title: ong.name,
            description: ong.description,
            link: ong.link,
            icon: (
                <Image
                    src={ong.image}
                    alt={ong.name}
                    width={ongExtras[ong.id].width}
                    height={ongExtras[ong.id].height}
                    draggable={false}
                    className="text-white"
                    loading="lazy"
                />
            ),
        }));

    return (
        <CarouselCard
            items={items}
            baseWidth={width}
            autoplay={true}
            autoplayDelay={5000}
            pauseOnHover={true}
            loop={true}
            round={false}
        />
    );
}
