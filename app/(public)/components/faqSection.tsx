"use client"

import { useEffect, useRef } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "Cum verificam transparenta financiara a ONG-urilor?",
    answer:
      "Fiecare ONG listat pe Civicom trece printr-un proces riguros de verificare. Analizam rapoartele financiare anuale, auditul extern, sursele de finantare si modul in care fondurile sunt alocate. Doar organizatiile cu transparenta financiara dovedita sunt acceptate pe platforma.",
  },
  {
    question: "Ce inseamna impact demonstrabil?",
    answer:
      "Impactul demonstrabil se refera la rezultate concrete si masurabile ale activitatilor ONG-urilor. Evaluam numarul de beneficiari, proiectele finalizate cu succes, rapoartele de impact si testimonialele din comunitatile deservite. Ne asiguram ca fiecare organizatie produce schimbari reale.",
  },
  {
    question: "De ce conteaza activitatea constanta?",
    answer:
      "O organizatie cu activitate constanta demonstreaza angajament pe termen lung fata de cauza sa. Verificam istoricul proiectelor, frecventa evenimentelor organizate, prezenta in comunitate si capacitatea de a mentine programe in desfasurare. Aceasta asigura sustinerea continua a beneficiarilor.",
  },
  {
    question: "Cum colectam feedback-ul din comunitate?",
    answer:
      "Feedback-ul este colectat direct de la voluntari, beneficiari si parteneri ai ONG-urilor. Folosim sondaje anonime, recenzii verificate si interviuri cu membrii comunitatii. Acest feedback ne ajuta sa mentinem un standard ridicat de calitate si incredere pe platforma.",
  },
  {
    question: "Cum pot deveni voluntar prin Civicom?",
    answer:
      "Crearea unui cont pe Civicom este gratuita si simpla. Dupa inregistrare, poti explora evenimentele disponibile in zona ta, te poti inscrie la activitati care te intereseaza si poti urmari progresul tau ca voluntar. Fiecare contributie conteaza si este recunoscuta pe platforma.",
  },
]

export function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const animatedEls = entry.target.querySelectorAll("[data-animate]")
            animatedEls.forEach((el, i) => {
              const htmlEl = el as HTMLElement
              htmlEl.style.animationDelay = `${i * 100}ms`
              htmlEl.classList.add("animate-fade-in-up")
            })
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="despre" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <div className="mb-12 text-center">
          <span
            data-animate
            className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary opacity-0"
          >
            Transparenta si incredere
          </span>
          <h2
            data-animate
            className="text-3xl font-bold tracking-tight text-foreground opacity-0 md:text-4xl lg:text-5xl"
          >
            De ce avem incredere in aceste ONG-uri?
          </h2>
          <p
            data-animate
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground opacity-0 lg:text-lg"
          >
            Fiecare organizatie este evaluata pe baza criteriilor noastre
            riguroase de selectie.
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
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
