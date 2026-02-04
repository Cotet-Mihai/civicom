import {useState} from "react";

import {stepsData} from "@/features/protest/protest.config";

import {UseNavigationResults} from "@/features/protest/types/navigationTypes";

type UseNavigationProps = {
    validators: (() => boolean)[];
    locationControl: {
        reset: () => void;
    } | undefined
}

export default function useNavigation({validators, locationControl}: UseNavigationProps): UseNavigationResults {

    const [step, setStep] = useState(1);

    function nextStep(): void {
        if (step === 1) {
            locationControl?.reset();
        }

        const isValid = validators[step - 1]();

        if (isValid && step < stepsData.length) {
            setStep((value: number): number => value + 1);
        } else {
            // TODO: trimite datele către server
        }
    }


    function prevStep(): void {
        setStep((prev: number): number => prev - 1)
    }

    return {
        state: {
            value: step,
            set: setStep
        },
        controls: {
            nextStep: nextStep,
            prevStep: prevStep,
        }
    }
}