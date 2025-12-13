import Image from 'next/image';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {JSX} from "react";

/**
 * HeroSection component for the homepage.
 * Displays a headline, search input, call-to-action button, and hero image.
 *
 * @returns {JSX.Element} The rendered hero section for the homepage.
 */
export default function HeroSection(): JSX.Element {

    return (
        <div className={cn(
            'h-screen flex justify-center items-center flex-col', // Full screen, centered column layout
            'sm:flex-row', // Switch to row layout on small screens and up
        )}>
            <div>
                {/* Headline texts */}
                <div>
                    <h3 className={'text-green-600 text-3xl sm:text-4xl'}>Găsește evenimente,</h3>
                    <h2 className={'text-green-500 font-bold text-4xl sm:text-6xl'}>FII SCHIMBAREA,</h2>
                    <h3 className={'text-green-700 font-semibold text-4xl sm:text-5xl'}>fă voluntariat.</h3>
                </div>

                {/* Search input and button section */}
                <div className={cn(
                    'flex flex-col w-full mt-6 px-1 gap-2', // Default column layout with spacing
                    'sm:flex-row' // Switch to row layout on small screens
                )}>
                    {/* Desktop input */}
                    <Input
                        placeholder={'Descoperă Evenimente, Proteste, Petiții & Altele...'}
                        className={cn(
                            'hidden', // Hidden by default
                            'sm:block' // Visible on small screens and up
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
                    <Button>
                        <Search />
                        Caută
                    </Button>
                </div>
            </div>

            {/* Hero image for desktop */}
            <Image
                src={'/webp/home_image.webp'}
                alt={'Home Image'}
                width={500}
                height={500}
                className={cn(
                    'hidden', // Hidden by default
                    'sm:block' // Visible on small screens and up
                )}
            />

            {/* Hero image for mobile */}
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
    );
}
