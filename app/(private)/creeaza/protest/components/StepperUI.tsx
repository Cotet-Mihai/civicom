"use client"

import {Dispatch, ReactNode, SetStateAction} from "react"
import { Badge } from "@/components/reui/badge"
import {
    Stepper,
    StepperContent,
    StepperIndicator,
    StepperItem,
    StepperNav,
    StepperPanel,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
} from "@/components/reui/stepper"

import { Button } from "@/components/ui/button"
import {
    CheckIcon,
    LoaderCircleIcon,
} from 'lucide-react'
import {steps} from '@/app/(private)/creeaza/protest/data';


type StepperFlowProps = {
    children: ReactNode,
    currentStep: {
        value: number,
        set: Dispatch<SetStateAction<number>>
    },
    handleNavigation: {
        nextStep: () => void,
        prevStep: () => void
    },
    description?: string
}

export function StepperUI({children, currentStep, handleNavigation, description}: StepperFlowProps) {

    return (
        <Stepper
            value={currentStep.value}
            onValueChange={currentStep.set}
            indicators={{
                completed: (
                    <CheckIcon  className="size-3.5" />
                ),
                loading: (
                    <LoaderCircleIcon  className="size-3.5 animate-spin" />
                ),
            }}
            className="w-full space-y-5"
        >
            <StepperNav className="gap-3">
                {steps.map((step, index) => (
                    <StepperItem
                        key={index}
                        step={index + 1}
                        className="relative flex-1 items-start"
                    >
                        <StepperTrigger
                            className="flex grow flex-col items-start justify-center gap-2.5"
                            asChild
                        >
                            <StepperIndicator className="transition-all duration-500 ease-in-out data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground data-[state=completed]:bg-success size-8 border-2 data-[state=completed]:text-white data-[state=inactive]:bg-transparent data-[state=active]:bg-blue-500">
                                {step.icon}
                            </StepperIndicator>
                            <div className="flex flex-col items-start gap-1">
                                <div className="text-muted-foreground text-[10px] font-semibold uppercase">
                                    Pasul {index + 1}
                                </div>
                                <StepperTitle className="group-data-[state=inactive]/step:text-muted-foreground text-start text-base font-semibold">
                                    {step.title}
                                </StepperTitle>
                                <div>
                                    <Badge
                                        size="sm"
                                        className="hidden group-data-[state=active]/step:inline-flex px-2 bg-blue-300/30 text-blue-700"
                                    >
                                        În curs
                                    </Badge>
                                    <Badge
                                        variant="primary-light"
                                        size="sm"
                                        className="hidden group-data-[state=completed]/step:inline-flex px-2"
                                    >
                                        Finalizat
                                    </Badge>
                                    <Badge
                                        variant="secondary"
                                        size="sm"
                                        className="text-muted-foreground hidden group-data-[state=inactive]/step:inline-flex px-2"
                                    >
                                        În așteptare
                                    </Badge>
                                </div>
                            </div>
                        </StepperTrigger>

                        {steps.length > index + 1 && (
                            <StepperSeparator className="transition-all duration-500 ease-in-out group-data-[state=completed]/step:bg-success absolute inset-x-0 start-9 top-4 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
                        )}
                    </StepperItem>
                ))}
            </StepperNav>

            <StepperPanel className="text-sm">
                {steps.map((step, index) => {
                    return (
                        <StepperContent
                            key={index}
                            value={index + 1}
                            className="flex items-start justify-start"
                        >
                            <section className={'flex flex-col w-full'}>
                                <div className={'mb-5'}>
                                    <h3 className={'text-2xl font-semibold'}>{step.title}</h3>
                                    <span className={'text-muted-foreground'}>{description !== '' ? description : step.description}</span>
                                </div>

                                {children}
                            </section>

                        </StepperContent>
                    )
                })}
            </StepperPanel>

            <div className="flex items-center justify-between gap-2.5">
                <Button
                    variant="outline"
                    onClick={handleNavigation.prevStep}
                    disabled={currentStep.value === 1}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    onClick={handleNavigation.nextStep}
                    disabled={currentStep.value === steps.length}
                >
                    {currentStep.value === steps.length ? 'Trimite' : 'Următorul'}
                </Button>
            </div>
        </Stepper>
    )
}
