'use client'

import {useState} from "react";
import {steps} from "@/app/(private)/creeaza/protest/data";


export default function useNavigation({
                                          validators,
                                          handleSubmit,
                                          isSubmitting,
                                          typeProtest
                                      } : {
    validators: (() => boolean)[],
    handleSubmit: () => Promise<void>,
    isSubmitting: boolean,
    typeProtest: string
}) {
    const [currentStep, setCurrentStep] = useState<number>(1);


    async function nextStep(): Promise<void> {
        if (isSubmitting) return;

        let isValid = false;

        if (currentStep === 1) {
            isValid = validators[0]();
        } else if (currentStep === 2) {
            switch (typeProtest) {
                case "gathering":
                    isValid = validators[1]();
                    break;
                case "march":
                    isValid = validators[2]();
                    break;
                case "picket":
                    isValid = validators[3]();
                    break;
                case "boycott":
                    isValid = validators[4]();
                    break;
                default:
                    isValid = false;
            }
        } else if (currentStep === 3) {
            isValid = validators[5]();
        } else if (currentStep === 4) {
            isValid = validators[6]();
        }

        if (isValid) {
            if (currentStep < steps.length) {
                setCurrentStep((value: number): number => value + 1);
            } else {
                await handleSubmit();
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