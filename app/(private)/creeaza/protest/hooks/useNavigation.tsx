import {useState} from "react";
import {steps} from "@/app/(private)/creeaza/protest/data";


export default function useNavigation(validators: (() => boolean)[]) {
    const [currentStep, setCurrentStep] = useState<number>(1);



    function nextStep(): void {
        const isValid = validators[currentStep - 1]();

        if (isValid) {
            if (currentStep < steps.length) {
                setCurrentStep((value: number): number => value + 1);
            } else {
                // TODO: trimite datele catre server
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