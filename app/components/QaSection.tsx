import { cn } from "@/lib/utils";
import { bebas_neue } from "@/lib/fonts";
import SpotlightCard from "@/components/SpotlightCard";
import {JSX} from "react";

/**
 * QaSection component displays a section explaining why the highlighted
 * organizations are trusted. Uses SpotlightCard as a container with styled paragraphs.
 *
 * @returns {JSX.Element} The rendered QA section with headline and content paragraphs
 */
export default function QaSection(): JSX.Element {
    return (
        <SpotlightCard className={cn(
            'flex justify-center items-center flex-col my-auto p-5 h-full', // Full height, centered column layout
            'sm:px-15' // Padding on small screens and up
        )}>
            {/* Headline */}
            <h5 className={cn(
                `${bebas_neue.className} text-2xl text-white relative top-8 left-0`,
                'sm:text-5xl mb-10' // Larger text and bottom margin on small screens
            )}>
                De ce avem încredere în acestea ?
            </h5>

            {/* Content container for paragraphs */}
            <div className={cn(
                'flex justify-center items-center flex-col', // Column layout by default
                'sm:gap-10 sm:flex-row' // Row layout with gap on small screens and up
            )}>
                <div className={cn(
                    'relative flex justify-center items-center gap-10 flex-col', // Column layout with spacing
                    'sm:flex-row' // Switch to row layout on small screens
                )}>
                    {/* Paragraphs explaining trust in organizations */}
                    <p className={cn(
                        'bg-yellow-300 w-full max-w-xl h-60 flex justify-center items-center p-7 rounded-4xl text-green-900 font-semibold',
                        'sm:h-40' // Adjust height on small screens
                    )}>
                        Ne-am câștigat încrederea în aceste organizații observând modul în care își desfășoară
                        activitățile și impactul pozitiv pe care îl au în comunitate.
                    </p>
                    <p className={cn(
                        'bg-yellow-300 w-full max-w-xl h-60 flex justify-center items-center p-7 rounded-4xl text-green-900 font-semibold',
                        'sm:h-40'
                    )}>
                        Pe lângă activitățile curente, organizațiile investesc timp și resurse în educarea
                        și sprijinirea membrilor comunității, oferind oportunități de dezvoltare și
                        participare activă.
                    </p>
                    <p className={cn(
                        'bg-yellow-300 w-full max-w-xl h-60 flex justify-center items-center p-7 rounded-4xl text-green-900 font-semibold',
                        'sm:h-40'
                    )}>
                        Experiența lor dovedită și dedicarea în implementarea proiectelor
                        fac ca fiecare inițiativă să aducă un impact semnificativ, consolidând relația
                        de încredere și parteneriat cu beneficiarii și colaboratorii.
                    </p>
                </div>
            </div>
        </SpotlightCard>
    );
}
