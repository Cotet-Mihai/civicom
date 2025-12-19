import {CarouselCardContainerProps, CarouselItems} from "@/types/carouselCard";
import CarouselCard from "@/components/CarouselCard";
import {trustedONGs, extrasONGs} from "@/data/trustedONG";
import Image from "next/image";

export default function CarouselCardContainer({ width }: CarouselCardContainerProps) {

    const carouselItems: CarouselItems[] = trustedONGs
        .filter((ong) => ong.id !== 6)
        .map((ong): CarouselItems => ({
            id: ong.id,
            title: ong.name,
            description: ong.description,
            link: ong.link,
            icon: (
                <Image
                    src={ong.image}
                    alt={ong.name}
                    width={extrasONGs[ong.id].width}
                    height={extrasONGs[ong.id].height}
                    draggable={false}
                    className="text-white"
                    loading="lazy"
                />
            ),
        }));

    return (
        <CarouselCard
            items={carouselItems}
            baseWidth={width}
            autoplay={true}
            autoplayDelay={5000}
            pauseOnHover={true}
            loop={true}
            round={false}
        />
    );
}
