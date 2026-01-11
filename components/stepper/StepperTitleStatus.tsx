import React from 'react';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
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
} from '@/components/ui/stepper';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {Check, LoaderCircleIcon, HelpCircle } from 'lucide-react';
import {toast} from "sonner";
import {H3} from "@/components/Typography";
import Link from "next/link";
import {MarchStep, StepperSteps} from "@/types/stepper";


type Props = {
    children?: React.ReactNode;
    steps: StepperSteps[];
    stepsState: {
        currentStep: number;
        setCurrentStep: (currentStep: number) => void;
    },
    onValidateNext: () => boolean | undefined;
    typeProtest: string | undefined;
}

export default function StepperTitleStatus({children, steps, stepsState, onValidateNext, typeProtest}: Props) {

    return (
        <>
            <div className={'flex justify-center items-center pb-7'}>
                <H3 className={'mr-auto'}>Creează Protest</H3>
                <Link href="/">
                    <h1 className="text-xl font-extrabold text-green-800">CIVICOM✨</h1>
                </Link>
            </div>
            <Stepper
                value={stepsState.currentStep}
                onValueChange={stepsState.setCurrentStep}
                indicators={{
                    completed: <Check className="size-4"/>,
                    loading: <LoaderCircleIcon className="size-4 animate-spin"/>,
                }}
                className="space-y-8"
            >
                <StepperNav className="gap-3">
                    {steps.map((step, index) => {
                        return (
                            <StepperItem key={index} step={index + 1} className="relative flex-1 items-start">
                                <StepperTrigger className="flex flex-col items-start justify-center gap-2.5 grow" asChild>
                                    <StepperIndicator
                                        className="size-8 border-2 data-[state=completed]:text-white data-[state=completed]:bg-green-500 data-[state=inactive]:bg-transparent data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground data-[state=active]:bg-blue-500">
                                        <step.icon className="size-4"/>
                                    </StepperIndicator>
                                    <div className="flex flex-col items-start gap-1">
                                        <div
                                            className="text-[10px] font-semibold uppercase text-muted-foreground">Pasul {index + 1}</div>
                                        <StepperTitle
                                            className="text-start text-base font-semibold group-data-[state=inactive]/step:text-muted-foreground">
                                            {step.title}

                                        </StepperTitle>
                                        <div>
                                            <Badge
                                                variant="primary"
                                                size="sm"
                                                appearance="light"
                                                className="hidden group-data-[state=active]/step:inline-flex"
                                            >
                                                În curs
                                            </Badge>

                                            <Badge
                                                variant="success"
                                                size="sm"
                                                appearance="light"
                                                className="hidden group-data-[state=completed]/step:inline-flex"
                                            >
                                                Finalizat
                                            </Badge>

                                            <Badge
                                                variant="secondary"
                                                size="sm"
                                                className="hidden group-data-[state=inactive]/step:inline-flex text-muted-foreground"
                                            >
                                                În așteptare
                                            </Badge>
                                        </div>
                                    </div>
                                </StepperTrigger>

                                {steps.length > index + 1 && (
                                    <StepperSeparator
                                        className="absolute top-4 inset-x-0 start-9 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none  group-data-[state=completed]/step:bg-green-500"/>
                                )}
                            </StepperItem>
                        );
                    })}
                </StepperNav>

                <StepperPanel className="text-sm">
                    {steps.map((step, index) => (
                        <StepperContent key={index} value={index + 1} className="flex items-start justify-center flex-col">
                            <h3 className={'font-semibold text-2xl'}>{step.title}</h3>
                            <div className="text-gray-400">
                                <p>Vă rugăm să completați toate informațiile.</p>
                                {typeProtest === 'gathering' && typeof step.description !== 'string'
                                    ? step.description.gathering && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="flex cursor-help items-center gap-2 text-sm text-gray-400 mt-5 mb-1">
                                                <span className={''}>Cum folosesc harta?</span>
                                                <HelpCircle className="size-4" />
                                            </div>
                                        </TooltipTrigger>

                                        <TooltipContent
                                            side="top"
                                            align="start"
                                            className="max-w-xs p-4 rounded-lg bg-white border border-gray-200 shadow-md"
                                        >
                                            <ul className="space-y-2 text-sm text-foreground">
                                                {step.description.gathering.map((item: MarchStep, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <span className="mt-0.5 shrink-0">{item.icon}</span>
                                                        <span className="leading-snug">{item.description}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </TooltipContent>
                                    </Tooltip>
                                )
                                    : null}

                                {typeProtest === "march" &&
                                    typeof step.description !== "string" &&
                                    step.description.march && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="flex cursor-help items-center gap-2 text-sm text-gray-400 mt-5 mb-1">
                                                    <span className={''}>Cum folosesc harta?</span>
                                                    <HelpCircle className="size-4" />
                                                </div>
                                            </TooltipTrigger>

                                            <TooltipContent
                                                side="top"
                                                align="start"
                                                className="max-w-xs p-4 rounded-lg bg-white border border-gray-200 shadow-md"
                                            >
                                                <ul className="space-y-2 text-sm text-foreground">
                                                    {step.description.march.map((item: MarchStep, idx) => (
                                                        <li key={idx} className="flex items-start gap-2">
                                                            <span className="mt-0.5 shrink-0">{item.icon}</span>
                                                            <span className="leading-snug">{item.description}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                            </div>
                            <div className={'w-full'}>
                                {children}
                            </div>
                        </StepperContent>
                    ))}
                </StepperPanel>

                <div className="flex items-center justify-between gap-2.5">
                    <Button variant="outline" onClick={() => stepsState.setCurrentStep(stepsState.currentStep - 1)}
                            disabled={stepsState.currentStep === 1}>
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            if (!onValidateNext()) {
                                toast.error("Toate câmpurile trebuie completate.");
                                return;
                            }
                            stepsState.setCurrentStep(stepsState.currentStep + 1);
                        }}
                        disabled={stepsState.currentStep === steps.length}
                    >
                        Următorul
                    </Button>
                </div>
            </Stepper>
        </>
    );
}