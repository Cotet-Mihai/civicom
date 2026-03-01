import Image from "next/image"
import {Button} from "@/components/ui/button"
import {ArrowRight, Calendar} from "lucide-react"

export function HeroSection() {

    return (
            <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 lg:flex-row lg:gap-16 lg:px-8">
                {/* Text content */}
                <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">

                    <h1 className="max-w-2xl">

                        <span
                            data-animate
                            className="block text-2xl font-medium leading-tight text-green-600 opacity-0 md:text-4xl"
                        >
                            Găsește evenimente,
                        </span>

                        <span
                            data-animate
                            className="block text-4xl font-bold uppercase leading-none tracking-tight text-primary opacity-0 md:text-8xl lg:text-6xl"
                        >
                            FII SCHIMBAREA,
                        </span>

                        <span
                            data-animate
                            className="block text-4xl font-medium leading-tight text-green-700 opacity-0 md:text-5xl text-right"
                        >
                            fă voluntariat.
                        </span>

                    </h1>
                    <p
                        data-animate
                        className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground opacity-0 lg:text-sm"
                    >
                        Aducem voluntari, ONG-uri și instituții împreună pentru evenimente, petiții și donații.
                        Descoperă, implică-te și susține cauze care contează. ✨
                    </p>
                    <div
                        data-animate
                        className="mt-8 flex flex-col gap-3 opacity-0 sm:flex-row"
                    >
                        <Button
                            size="lg"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6"
                        >
                            Descoperă evenimente
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="gap-2 border-primary/30 text-primary hover:bg-accent hover:text-accent-foreground px-6 bg-transparent"
                        >
                            <Calendar className="h-4 w-4" />
                            Creează un eveniment
                        </Button>
                    </div>
                </div>

                {/* Hero image */}
                <div
                    data-animate
                    className="flex flex-1 items-center justify-center opacity-0"
                >
                    <div className="relative">
                        <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl" />
                        <Image
                            src="/images/home_image.webp"
                            alt="Sigla Civicom - Mâini ridicate ținând o inimă verde"
                            width={460}
                            height={460}
                            className="relative rounded-2xl object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
    )
}
