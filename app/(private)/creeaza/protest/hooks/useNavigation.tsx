'use client'

import {useState} from "react";
import {steps} from "@/app/(private)/creeaza/protest/data";


export default function useNavigation(
    validators: (() => boolean)[],
    handleSubmit: () => Promise<void>,
    isSubmitting: boolean
) {
    const [currentStep, setCurrentStep] = useState<number>(1);


    async function nextStep(): Promise<void> {
        if (isSubmitting) return;

        const isValid = validators[currentStep - 1]();

        if (isValid) {
            if (currentStep < steps.length) {
                setCurrentStep((value: number): number => value + 1);
            } else {
                await handleSubmit()
            }
        }
    }

    function prevStep(): void {
        setCurrentStep((value: number): number => value - 1);
    }

    return {
        currentStepState: {
            value: currentStep,
            set: setCurrentStep
        },
        handleNavigation: {
            nextStep: nextStep,
            prevStep: prevStep
        }
    }
}