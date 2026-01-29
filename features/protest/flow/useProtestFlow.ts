'use client';

import { useState } from "react"
import { Camera, Info, ListTodo, MapPin } from "lucide-react"

import BasicInfoStep from "@/components/containers/protest/steps/BasicInfoStep"
import LocationStep from "@/components/containers/protest/steps/LocationStep"
import VisualMediaStep from "@/components/containers/protest/steps/VisualMediaStep"
import LogisticsStep from "@/components/containers/protest/steps/LogisticsStep"

import validateBasicInfo from "@/features/protest/validators/basicInfo.validator"
import { validateLocation } from "@/features/protest/validators/location.validator"
import { validateVisualMedia } from "@/features/protest/validators/visualMedia.validator"
import { validateLogistics } from "@/features/protest/validators/logistics.validator"

import {ProtestFlowData, AllSteps} from "@/types/protestStepper"


/**
 * Custom hook to manage the protest flow stepper.
 * Handles the current step, centralized flow data, and validation logic.
 *
 * @returns {Object} An object containing the stepper state, data, and helper functions
 * @returns {AllSteps[]} returns.steps - Array of all steps with their components, titles, icons, and validators
 * @returns {number} returns.currentStep - Current step index (1-based)
 * @returns {function} returns.setCurrentStep - Function to set the current step
 * @returns {ProtestFlowData} returns.flowData - Centralized data object containing all steps' data
 * @returns {function} returns.updateStepData - Function to update data for a specific step
 * @returns {function} returns.validateCurrentStep - Function to validate the current step
 */
export default function useProtestFlow() {
    const [currentStep, setCurrentStep] = useState(1);

    /**
     * Centralized state for all steps' data.
     * Each step's component updates its own slice of this state.
     * @type {ProtestFlowData}
     */
    const [flowData, setFlowData] = useState<ProtestFlowData>({
        basicInfo: {
            title: "",
            description: "",
            date: undefined,
            time: {
                from: '10:30',
                to: '12:30',
            },
            typeProtest: undefined
        },
        location: {
            // default values
        },
        visualMedia: {
            // default values
        },
        logistics: {
            // default values
        }
    })

    /**
     * Array defining all steps in the stepper.
     * Each step has an id, title, icon, component, and optional validation function.
     * @type {AllSteps[]}
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

    /**
     * Generic function to update data for a specific step.
     * @template K
     * @param {K} stepId - Key of the step in flowData
     * @param {Partial<ProtestFlowData[K]>} patch - Partial update for the step's data
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
     * Validates the current step using its validator function, if present.
     * Returns either {valid: true} or {valid: false, message: string}.
     * @returns {{valid: true} | {valid: false, message: string}}
     */
    function validateCurrentStep(): {valid: true} | {valid: false; message: string} {
        const step = steps[currentStep - 1];

        if (!step?.validate) return {valid: true};

        const dataForStep = flowData[step.id];
        const result = step.validate(dataForStep); // eroare dispare dupa ce ai pus toate type-urile la FormData{StepName}

        if (result === true) return {valid: true};

        return {valid: false, message: result};
    }

    return {
        steps: steps,
        currentStep: currentStep,
        setCurrentStep: setCurrentStep,
        flowData: flowData,
        updateStepData: updateStepData,
        validateCurrentStep: validateCurrentStep
    }
}
