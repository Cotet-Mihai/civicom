'use client';

import StepperFlowUI from "@/components/stepper/StepperFlowUI";
import {toast} from "sonner";
import {useProtestFlow} from "@/features/protest/flow/useProtestFlow";


export default function ProtestFlow() {
    const {
        steps,
        currentStep,
        setCurrentStep,
        stepData,
        validateCurrentStep,
    } = useProtestFlow();

    const StepComponent = steps[currentStep - 1].component;

    async function handleNext() {
        if (!validateCurrentStep()) {
            toast.error("Completează câmpurile obligatorii!");
            return;
        }

        if (currentStep < steps.length) {
            setCurrentStep(prev => prev + 1);
        } else {
            //todo: trimis datele catre server action pentru a salva informatiile
        }
    }

    async function handlePrev() {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    }

    return (
        <StepperFlowUI
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            steps={steps}
            handleNavigation={{
                handleNext: handleNext,
                handlePrev: handlePrev
            }}
        >
            <StepComponent {...stepData}/>
        </StepperFlowUI>
    )
}