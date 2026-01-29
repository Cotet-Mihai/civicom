'use client';

import { useState } from "react"
import { FormDataBasicInfo, Step } from "@/types/protestStepper"
import validateBasicInfo from "@/features/protest/validators/basicInfo.validator"
import { validateLocation } from "@/features/protest/validators/location.validator"
import { validateVisualMedia } from "@/features/protest/validators/visualMedia.validator"
import { validateLogistics } from "@/features/protest/validators/logistics.validator"
import { Camera, Info, ListTodo, MapPin } from "lucide-react"

import BasicInfoStep from "@/components/containers/protest/steps/BasicInfoStep"
import LocationStep from "@/components/containers/protest/steps/LocationStep"
import VisualMediaStep from "@/components/containers/protest/steps/VisualMediaStep"
import LogisticsStep from "@/components/containers/protest/steps/LogisticsStep"

export function useProtestFlow() {
    const [currentStep, setCurrentStep] = useState(1)

    const [basicInfo, setBasicInfo] = useState<FormDataBasicInfo>({
        title: "",
        description: "",
        date: undefined,
        time: { from: '10:30', to: '12:30' },
        typeProtest: undefined,
    })

    const protestSteps: Step[] = [
        {
            title: "Informații de bază",
            icon: Info,
            component: BasicInfoStep,
            validator: () => validateBasicInfo(basicInfo),
        },
        {
            title: "Locație",
            icon: MapPin,
            component: LocationStep,
            validator: () => validateLocation(),
        },
        {
            title: "Media vizuală",
            icon: Camera,
            component: VisualMediaStep,
            validator: () => validateVisualMedia(),
        },
        {
            title: "Logistică",
            icon: ListTodo,
            component: LogisticsStep,
            validator: () => validateLogistics(),
        },
    ]

    function updateBasicInfo(patch: Partial<FormDataBasicInfo>) {
        setBasicInfo(prev => ({ ...prev, ...patch }))
    }

    function validateCurrentStep(): { valid: true } | { valid: false; message: string } {
        const step = protestSteps[currentStep - 1]; // 1-based index

        if (!step?.validator) return { valid: true };

        const result = step.validator(); // result: true | string

        if (result === true) {
            return { valid: true }; // totul ok
        }

        if (typeof result === "string") {
            return { valid: false, message: result }; // mesaj clar
        }

        // fallback (nu ar trebui să ajungem aici)
        return { valid: false, message: "Unknown validation error" };
    }



    return {
        steps: protestSteps,
        currentStep,
        setCurrentStep,
        stepData: {
            data: basicInfo,
            onChange: updateBasicInfo,
        },
        validateCurrentStep,
    }
}
