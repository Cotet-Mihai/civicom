'use client';

import StepperFlowUI from "@/components/stepper/StepperFlowUI";
import {toast} from "sonner";
import useProtestFlow from "@/features/protest/flow/useProtestFlow";

/**
 * ProtestFlow component
 * Handles the multistep protest form using the custom useProtestFlow hook.
 * It integrates with StepperFlowUI and provides navigation, validation, and data handling for each step.
 */
export default function ProtestFlow() {
    /**
     * Destructure state and helper functions from the custom hook.
     * - steps: array of all steps
     * - currentStep: index of the current active step
     * - setCurrentStep: function to update the current step
     * - flowData: centralized data object for all steps
     * - updateStepData: function to update a step's data
     * - validateCurrentStep: function to validate the current step
     */
    const {
        steps,
        currentStep,
        setCurrentStep,
        flowData,
        updateStepData,
        validateCurrentStep
    } = useProtestFlow();

    /** Current step object */
    const step = steps[currentStep - 1]
    /** Component of the current step */
    const StepComponent = step.component;

    /**
     * Handles clicking "Next" button.
     * Validates the current step before proceeding.
     * If validation fails, shows a toast with missing fields.
     * Otherwise, increments the current step or submits data if it's the last step.
     */
    async function handleNext() {
        const result = validateCurrentStep();

        if (!result.valid) {
            toast.error(
                <span>
                    <span className={'font-bold'}>Câmpuri lipsă:</span>
                    <ol>
                      {result.message
                          .split(", ")
                          .map((field, index) => (
                              <li key={index}>• {field}</li>
                          ))}
                    </ol>
                  </span>
            );
            return;
        }

        if (currentStep < steps.length) {
            setCurrentStep(prev => prev + 1);
        } else {
            // TODO: trimite flowData către server
        }
    }

    /**
     * Handles clicking "Previous" button.
     * Decrements the current step, if possible.
     */
    async function handlePrev() {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    }

    return (
        <StepperFlowUI
            currentStep={currentStep} // current active step index
            setCurrentStep={setCurrentStep} // function to change step manually (clicking on stepper)
            steps={steps} // array of all steps with title, icon, component
            handleNavigation={{ // navigation functions
                handleNext: handleNext,
                handlePrev: handlePrev
            }}
        >
            {/* Render the current step's component, passing its data and onChange handler */}
            <StepComponent
                data={flowData[step.id]}
                onChange={(patch) => updateStepData(step.id, patch)}
            />
        </StepperFlowUI>
    )
}