import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/app/(public)/components/HeroSection";
import { NgoCarousel } from "@/app/(public)/components/NgoCarousel";
import { EventsSection } from "@/app/(public)/components/EventsSection";
import { FaqSection } from "@/app/(public)/components/FaqSection";
import { CtaSection } from "@/app/(public)/components/CtaSection";
import { Footer } from "@/app/(public)/components/Footer";
import {StatsSection} from "@/app/(public)/components/StatsSection";

export default function Page() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <section
                    id={'top'}
                    className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-background"
                >
                    {/* Subtle background decoration */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5" />
                        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-secondary/10" />
                    </div>

                    <HeroSection />
                </section>

                <NgoCarousel />

                <section
                    id={'top'}
                    className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-background"
                >

                    {/* Subtle background decoration */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -bottom-10 -left-40 h-[300px] w-[300px] rounded-full bg-primary/10" />
                        <div className="absolute -top-0 -right-40 h-[300px] w-[300px] rounded-full bg-primary/10" />
                        <div className="absolute -top-50 -right-20 h-[500px] w-[500px] rounded-full bg-secondary/5" />
                        <div className="absolute -top-30 -left-0 h-[300px] w-[300px] rounded-full bg-secondary/5" />
                        <div className="absolute -bottom-20 -right-10 h-[400px] w-[400px] rounded-full bg-secondary/5" />
                        <div className="absolute -bottom-40 -left-20 h-[250px] w-[250px] rounded-full bg-secondary/15" />
                    </div>

                    <FaqSection />
                </section>

                <section className="bg-primary py-16 lg:py-20">
                    <StatsSection />
                </section>
                <EventsSection />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
