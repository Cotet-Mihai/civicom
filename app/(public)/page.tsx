import { Navbar } from "@/app/(public)/components/Navbar";
import { HeroSection } from "@/app/(public)/components/HeroSection";
import { NgoCarousel } from "@/app/(public)/components/NgoCarousel";
import { EventsSection } from "@/app/(public)/components/EventsSection";
import { StatsSection } from "@/app/(public)/components/StatsSection";
import { FaqSection } from "@/app/(public)/components/FaqSection";
import { CtaSection } from "@/app/(public)/components/CtaSection";
import { Footer } from "@/app/(public)/components/Footer";

export default function Page() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <HeroSection />
                <NgoCarousel />
                <FaqSection />
                <StatsSection />
                <EventsSection />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
