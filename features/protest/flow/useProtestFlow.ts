'use client';

import { useState } from "react"

import {ProtestFlowData} from "@/types/protestStepper"

/**
 * Custom hook to manage the multistep Protest Flow form.
 *
 * Responsibilities:
 * - Keeps track of the current step in the form (1-based index)
 * - Stores centralized data for all steps in `flowData`
 * - Provides setter functions to update step data and navigate steps
 *
 * This hook only manages state.
 *
 * @returns {Object} An object containing:
 *  - currentStep: number — the index of the currently active step (1-based)
 *  - setCurrentStep: function — setter to change the current step
 *  - flowData: ProtestFlowData — centralized state object for all steps' data
 *  - setFlowData: function — setter to update the entire flowData object
 */
export default function useProtestFlow() {
    /**
     * Current active step in the form (1-based index).
     */
    const [currentStep, setCurrentStep] = useState(1);

    /**
     * Centralized state object containing data for all steps in the flow.
     * Each key corresponds to a step id.
     * Step components will update their own slice via onChange handlers.
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
        location: undefined, // Will be filled in when user reaches the Location step
        visualMedia: {
            // default values
        },
        logistics: {
            // default values
        }
    })

    return {
        currentStep: currentStep,
        setCurrentStep: setCurrentStep,
        flowData: flowData,
        setFlowData: setFlowData
    }
}
