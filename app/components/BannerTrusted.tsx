import { bebas_neue } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import CarouselCardContainer from "@/app/containers/CarouselCardContainer";
import {JSX} from "react";

/**
 * BannerTrusted component displays a banner section highlighting
 * trusted associations with a carousel of cards.
 *
 * @returns {JSX.Element} The rendered banner section with carousel
 */
export default function BannerTrusted(): JSX.Element {
    return (
        <div className={cn(
            'bg-green-500 flex justify-evenly items-center flex-col', // Column layout by default
            'sm:flex-row' // Row layout on small screens and up
        )}>
            {/* Headline with custom font and styled text */}
            <h4 className={cn(
                `${bebas_neue.className} text-5xl font-semibold uppercase text-green-900 m-5`,
            )}>
                <span className={'text-7xl text-yellow-50'}>
                    Asociații
                </span> în care <br /> avem
                <span className={cn(
                    'text-7xl text-yellow-300',
                    'sm:text-8xl' // Larger text on small screens and up
                )}>
                    încredere!
                </span>
            </h4>

            {/* Carousel for desktop and larger screens */}
            <div className={'hidden md:block'}>
                <CarouselCardContainer width={600}/>
            </div>

            {/* Carousel for mobile screens */}
            <div className={cn(
                'block mb-3', // Visible on mobile
                'sm:hidden' // Hidden on small screens and up
            )}>
                <CarouselCardContainer width={350}/>
            </div>
        </div>
    );
}
