'use client';

import {JSX} from "react";
import useProtestFlow from "@/features/protest/flow/useProtestFlow";

import StepperFlowUI from "@/components/stepper/StepperFlowUI";
import { Camera, Info, ListTodo, MapPin } from "lucide-react"
import { toast } from "sonner";

import BasicInfoStep from "@/components/containers/protest/steps/BasicInfoStep"
import LocationStep from "@/components/containers/protest/steps/LocationStep"
import VisualMediaStep from "@/components/containers/protest/steps/VisualMediaStep"
import LogisticsStep from "@/components/containers/protest/steps/LogisticsStep"

import validateBasicInfo from "@/features/protest/validators/basicInfo"
import { validateLocation } from "@/features/protest/validators/location"
import { validateVisualMedia } from "@/features/protest/validators/visualMedia"
import { validateLogistics } from "@/features/protest/validators/logistics"

import {AllSteps, ProtestFlowData} from "@/types/protestStepper";

/**
 * ProtestFlow component
 * Manages the multistep protest creation form.
 * Integrates with StepperFlowUI, handles navigation, validation, and centralized data for all steps.
 */
export default function ProtestFlow() {
    /**
     * Destructure the state and helpers from the custom useProtestFlow hook.
     * - currentStep: 1-based index of the active step
     * - setCurrentStep: function to change the current step
     * - flowData: centralized data object containing all steps' state
     * - setFlowData: function to update the flowData
     */
    const {
        currentStep,
        setCurrentStep,
        flowData,
        setFlowData
    } = useProtestFlow();

    /**
     * Array of all steps in the flow.
     * Each step has an id, title, icon, component, and optionally a validator function.
     * The id key is used to access its slice in flowData.
     */
    const steps: AllSteps[] = [
        {
            id: 'basicInfo',
            title: 'Informații de bază',
            icon: Info,
            component: BasicInfoStep,
            validate: validateBasicInfo
        },
        {
            id: "location",
            title: "Locație",
            icon: MapPin,
            component: LocationStep,
        },
        {
            id: "visualMedia",
            title: "Media vizuală",
            icon: Camera,
            component: VisualMediaStep,
        },
        {
            id: "logistics",
            title: "Logistică",
            icon: ListTodo,
            component: LogisticsStep,
        },
    ];

    /** Current step object from steps array based on 1-based currentStep */
    const step = steps[currentStep - 1]

    /**
     * Renders the component of the current step.
     * Passes its corresponding data slice and an onChange handler to update flowData.
     */
    function renderStep(): JSX.Element | undefined {
        switch (step.id) {
            case "basicInfo":
                return (
                    <BasicInfoStep
                        data={flowData.basicInfo}
                        onChange={(patch) => updateStepData('basicInfo', patch)}
                    />
                );

            case "location":
                return (
                    <LocationStep
                        typeProtest={flowData.basicInfo.typeProtest}
                        data={flowData.location}
                        onChange={(locationData) => updateStepData("location", locationData)}
                    />
                )
        }
    }

    /**
     * Updates a specific slice of flowData.
     * @template K - the key of the step in ProtestFlowData
     * @param stepId - which step's data to update
     * @param patch - partial data to merge with existing step data
     */
    function updateStepData<K extends keyof ProtestFlowData>(stepId: K, patch: Partial<ProtestFlowData[K]>) {
        setFlowData(prev => ({
            ...prev,
            [stepId]: {
                ...prev[stepId], //TODO: sterge '?? {}' dupa ce ai pus toate type-urile la FormData{StepName}
                ...patch,
            },
        }));
    }

    /**
     * Validates the data of the current step using its validator function (if any).
     * Returns an object indicating validity and an optional message string.
     */
    function validateCurrentStep(): {valid: true} | {valid: false; message: string} {
        if (!step?.validate) return {valid: true}; // TODO: de sters dupa implementarea tuturor validarilor

        const dataForStep = flowData[step.id];
        const result = step.validate(dataForStep); // eroare dispare dupa ce ai pus toate type-urile la FormData{StepName}

        if (result === true) return {valid: true};

        return {valid: false, message: result};
    }

    /**
     * Handles clicking "Next" button.
     * Validates the current step; shows a toast if invalid.
     * Otherwise, advances to next step or submits the form if it's the last step.
     */
    function handleNext() {
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
     * Moves the current step backward if possible.
     */
    function handlePrev() {
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
            {/* Render the current step's component */}
            {renderStep()}
        </StepperFlowUI>
    )
}