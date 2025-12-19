import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import Image from "next/image"
import type {JSX} from "react";

/**
 * HeroSection component for the home.
 * Displays a headline, search input, call-to-action button, and hero image.
 *
 * @returns {JSX.Element} The rendered hero section for the home.
 */
export default function HeroSection(): JSX.Element {
    return(
        <div className={cn(
            'h-screen flex justify-center items-center flex-col', // Default
            'sm:flex-row' // Desktop
        )}>
            <div>
                <div>
                    <h3 className={cn(
                        'text-green-600 text-3xl', // Default
                        'sm:text-4xl' // Desktop
                    )}>Găsește evenimente,</h3>
                    <h2 className={cn(
                        'text-green-500 font-bold text-4xl',
                        'sm:text-6xl'
                    )}>FII SCHIMBAREA,</h2>
                    <h3 className={cn(
                        'text-green-700 font-semibold text-4xl',
                        'sm:text-5xl'
                    )}>fă voluntariat.</h3>
                </div>

                <div className={cn(
                    'flex flex-col w-full mt-6 px-1 gap-2',
                    'sm:flex-row'
                    )}>

                    {/* Desktop input */}
                    <Input
                        placeholder={'Descoperă Evenimente, Proteste, Petiții & Altele...'}
                        className={cn(
                            'hidden',
                            'sm:block'
                        )}
                    />

                    {/* Mobile input */}
                    <Input
                        placeholder={'Descoperă Evenimente'}
                        className={cn(
                            'block', // Visible on mobile
                            'sm:hidden' // Hidden on small screens and up
                        )}
                    />

                    {/* Search button with icon */}
                    <Button variant={"mainButton"}>
                        <Search />
                        Caută
                    </Button>
                </div>
            </div>

            {/* Desktop Hero Image*/}
            <Image
                src={'/webp/home_image.webp'}
                alt={'Home Image'}
                width={500}
                height={500}
                className={cn(
                    'hidden',
                    'sm:block'
                )}
            />

            {/* Mobile Hero Image*/}
            <Image
                src={'/webp/home_image.webp'}
                alt={'Home Image'}
                width={280}
                height={280}
                className={cn(
                    'block', // Visible on mobile
                    'sm:hidden' // Hidden on small screens and up
                )}
            />
        </div>
    )
}