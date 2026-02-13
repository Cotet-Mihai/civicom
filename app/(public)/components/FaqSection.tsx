"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {faqItems} from "@/data/seedHome";
import {useAnimateOnIntersect} from "@/app/(public)/hook/useAnimateOnIntersect";

export function FaqSection() {

    const sectionRef = useAnimateOnIntersect();

    return (
        <section
            ref={sectionRef}
            id="despre"
            className="relative bg-background py-20 lg:py-28 min-h-screen overflow-hidden"
        >
            {/* Conținutul secțiunii */}
            <div className="mx-auto max-w-4xl px-4 lg:px-8 relative z-20">
                <div className="mb-12 text-center">
          <span
              data-animate
              className="inline-block text-sm font-semibold uppercase tracking-widest text-secondary opacity-0 lg:text-lg"
          >
            Transparență și încredere
          </span>
                    <h2
                        data-animate
                        className="text-3xl font-bold tracking-tight opacity-0 md:text-4xl lg:text-6xl text-primary"
                    >
                        De ce avem încredere în aceste ONG-uri?
                    </h2>
                    <p
                        data-animate
                        className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground opacity-0 lg:text-lg"
                    >
                        Badge-ul <strong>„Verificat”</strong> garantează că aceste ONG-uri respectă standarde ridicate de
                        transparență și rezultate reale, astfel încât tu să știi că fiecare contribuție contează.
                    </p>
                </div>

                <div data-animate className="opacity-0">
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <AccordionItem
                                key={item.question}
                                value={`item-${index}`}
                                className="border-border/60"
                            >
                                <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-primary hover:no-underline lg:text-lg">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="indent-8 text-base leading-relaxed text-muted-foreground">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>

            {/* Cercuri decorative în fundal */}
            <div className="pointer-events-none absolute inset-0 z-10">
                {/* Cercuri decorative în fundal */}
                <div className="pointer-events-none absolute inset-0 z-10">
                    <div className="absolute -bottom-10 -left-40 h-[300px] w-[300px] rounded-full bg-primary/10" />
                    <div className="absolute -top-0 -right-40 h-[300px] w-[300px] rounded-full bg-primary/10" />
                    <div className="absolute -top-50 -right-20 h-[500px] w-[500px] rounded-full bg-secondary/5" />
                    <div className="absolute -top-30 -left-0 h-[300px] w-[300px] rounded-full bg-secondary/5" />
                    <div className="absolute -bottom-20 -right-10 h-[400px] w-[400px] rounded-full bg-secondary/5" />
                    <div className="absolute -bottom-40 -left-20 h-[250px] w-[250px] rounded-full bg-secondary/15" />
                </div>

            </div>
        </section>
    )
}
