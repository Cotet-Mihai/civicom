'use client';

import {useState} from "react";
import {FormDataBasicInfo} from "@/types/protestStepper";
import {validateBasicInfo} from "@/features/protest/validators/basicInfo.validator";
import {protestSteps} from "@/features/protest/config/steps.config";
import {validateLocation} from "@/features/protest/validators/location.validator";
import {validateVisualMedia} from "@/features/protest/validators/visualMedia.validator";
import {validateLogistics} from "@/features/protest/validators/logistics.validator";

export function useProtestFlow() {
    const [currentStep, setCurrentStep] = useState(1);

    const [basicInfo, setBasicInfo] = useState<FormDataBasicInfo>({
        title: "",
        description: "",
        date: undefined,
        time: { from: "10:30", to: "12:30" },
        typeProtest: undefined,
    });

    function updateBasicInfo(patch: Partial<FormDataBasicInfo>) {
        setBasicInfo(prev => ({ ...prev, ...patch}));
    }

    function validateCurrentStep() {
        if (currentStep === 1) return validateBasicInfo(basicInfo);
        if (currentStep === 2) return validateLocation();
        if (currentStep === 3) return validateVisualMedia();
        if (currentStep === 4) return validateLogistics();
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
    };
}