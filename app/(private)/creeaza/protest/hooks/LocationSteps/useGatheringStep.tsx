import React, {useState} from "react";
import {checkField, showErrorToast} from "@/app/(private)/creeaza/protest/utils";
import {GateringStates, GatheringStepProps} from "@/app/(private)/creeaza/protest/types";
import {GatheringStep} from "@/app/(private)/creeaza/protest/components/steps/locationSteps/locationstep.dynamic";

type UseGatheringStepReturn = {
    states: GateringStates,
    validator: () => boolean,
    component: React.ComponentType<GatheringStepProps>
}

export default function useGatheringStep(): UseGatheringStepReturn {
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);

    function validator(): boolean {
        const missingFields: string[] = []

        checkField('Locația', lat, missingFields)

        if (missingFields.length > 0) {
            showErrorToast(missingFields);
            return false;
        }
        return true;
    }

    return {
        states: {
            lat: { value: lat, set: setLat },
            lng: { value: lng, set: setLng }
        },
        validator: validator,
        component: GatheringStep
    }
}