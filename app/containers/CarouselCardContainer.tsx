import CarouselCard from "@/components/CarouselCard";
import {ongExtras, trustedOngs} from "@/data/trustedOng";
import Image from "next/image";
import React from "react";
import {CarouselCardContainerProps, Items} from "@/types/carouselCard";

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
