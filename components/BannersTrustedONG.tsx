import {cn} from "@/lib/utils";
import {bebas_neue} from "@/lib/fonts";
import CarouselCardContainer from "@/components/containers/home/CarouselCardContainer";

export default function BannersTrustedONG() {
    return (
        <div className={cn(
            'bg-green-500 flex justify-evenly items-center flex-col', // Default
            'sm:flex-row' // Desktop
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
                    'sm:text-8xl'
                )}>
                    încredere!
                </span>
            </h4>

            {/* CarouselCard for desktop and larger screens */}
            <div className={'hidden md:block'}>
                <CarouselCardContainer width={600}/>
            </div>

            {/* CarouselCard for mobile screens */}
            <div className={cn(
                'block mb-3',
                'sm:hidden'
            )}>
                <CarouselCardContainer width={350}/>
            </div>
        </div>
    )
}