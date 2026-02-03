'use client';

import {useEffect} from "react";

import useNavigation from "@/features/protest/hooks/useNavigation";
import useBasicInfoStep from "@/features/protest/hooks/useBasicInfoStep";
import useLocationStep from "@/features/protest/hooks/useLocationStep";
import useVisualMediaStep from "@/features/protest/hooks/useVisualMediaStep";
import useLogisticsStep from "@/features/protest/hooks/useLogisticsStep";

// TODO: De adaugat typeResult dupa ce ai toate controalele

export default function useProtestFlow() {

    const basicInfo = useBasicInfoStep();
    const location = useLocationStep(basicInfo.state.value.typeProtest);
    const visualMedia = useVisualMediaStep();
    const logistics = useLogisticsStep()

    const validators = [
        basicInfo.validator,
        ...(location ? [location.validator] : []),
        visualMedia.validator,
        logistics.validator
    ];
    const step = useNavigation({validators: validators, locationControl: location?.controls});

    // TODO: De sters useEffect-ul dupa ce ai terminat acest feature.
    useEffect(() => {
        console.log("Current Step:", step.state.value);
        console.log("Basic Info:", basicInfo.state.value);
        console.log("Visual Media:", visualMedia.state.value);
        console.log("Logistics:", logistics.state.value);
        console.log("Location State:", location?.state.value);
    }, [
        step.state.value,
        basicInfo.state.value,
        visualMedia.state.value,
        logistics.state.value,
        location?.state.value,
    ]);

    return {
        step: step,
        basicInfo: basicInfo,
        location: location,
        visualMedia: visualMedia,
        logistics:logistics
    }
}
