'use client';

import { useState } from "react";

import {BasicInfo, UseProtestFlowResult, VisualMedia, Logistics} from "@/features/protest/types";
import useLocationFlow from "@/features/protest/hooks/useLocationFlow";

export default function useProtestFlow(): UseProtestFlowResult {

    const [currentStep, setCurrentStep] = useState(1);

    const [basicInfo, setBasicInfo] = useState<BasicInfo>({
        title:"",
        description: "",
        date: undefined,
        time: {
            to: "10:30",
            from: "12:30"
        },
        typeProtest: undefined
    });

    const {gatheringState, marchState, picketState, boycottState} = useLocationFlow();

    const [visualMedia, setVisualMedia] = useState<VisualMedia>(undefined);

    const [logistics, setLogistics] = useState<Logistics>(undefined)

    return {
        currentStepState: {
            value: currentStep,
            set: setCurrentStep
        },
        stepsStates: {
            basicInfo: {
                value: basicInfo,
                set: setBasicInfo
            },
            visualMedia: {
                value: visualMedia,
                set: setVisualMedia
            },
            logistics: {
                value: logistics,
                set: setLogistics
            }
        },
        locationFlow: {
            gatheringState: gatheringState,
            marchState: marchState,
            picketState: picketState,
            boycottState: boycottState
        }
    }
}
