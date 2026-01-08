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
import {Check, LoaderCircleIcon} from 'lucide-react';
import {IconType} from "react-icons";
import {toast} from "sonner";

type Step = {
    title: string;
    icon: IconType;
}

type Props = {
    children?: React.ReactNode;
    steps: Step[];
    stepsState: {
        currentStep: number;
        setCurrentStep: (currentStep: number) => void;
    },
    onValidateNext: () => boolean | undefined
}

export default function StepperTitleStatus({children, steps, stepsState, onValidateNext}: Props) {

    return (
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
                        <p className={'mb-8 text-gray-400'}>Completați toate informațiile pentru a continua.</p>
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
    );
}
