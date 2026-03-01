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
            <div className="mx-auto max-w-4xl px-4 lg:px-8 relative z-20" ref={sectionRef}>
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
    )
}
