import { Navbar } from "@/app/(public)/components/navbar";
import { HeroSection } from "@/app/(public)/components/heroSection";
import { NgoCarousel } from "@/app/(public)/components/ngoCarousel";
import { EventsSection } from "@/app/(public)/components/eventsSection";
import { StatsSection } from "@/app/(public)/components/statsSection";
import { FaqSection } from "@/app/(public)/components/faqSection";
import { TestimonialsSection } from "@/app/(public)/components/testimonialsSection";
import { CtaSection } from "@/app/(public)/components/ctaSection";
import { Footer } from "@/app/(public)/components/footer";

export default function Page() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <HeroSection />
                <NgoCarousel />
                <FaqSection />
                <EventsSection />
                <StatsSection />
                <TestimonialsSection />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
