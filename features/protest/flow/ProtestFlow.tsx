'use client';

import {JSX} from "react";
import {toast} from "sonner";

import useProtestFlow from "@/features/protest/hooks/useProtestFlow";

import StepperFlowUI from "@/features/protest/components/StepperFlowUI";

import BasicInfoStep from "@/features/protest/components/steps/BasicInfoStep";
import VisualMediaStep from "@/features/protest/components/steps/VisualMediaStep";
import LogisticsStep from "@/features/protest/components/steps/LogisticsStep";

import GatheringMap from "@/features/protest/components/steps/locationSteps/gatheringMap";
import MarchMap from "@/features/protest/components/steps/locationSteps/marchMap";
import PicketMap from "@/features/protest/components/steps/locationSteps/PicketMap";
import BoycottMap from "@/features/protest/components/steps/locationSteps/boycottMap";
import LocationFlowUI from "@/features/protest/components/LocationFlowUI";

import {defaultLocation, stepsData} from "@/features/protest/protest.config";

import {ValidateCurrentStepResult} from "@/features/protest/types";



export default function ProtestFlow() {
    const {currentStepState, stepsStates, locationFlow} = useProtestFlow();

    function getLocationProps() {
        switch (stepsStates.basicInfo.value.typeProtest) {
            case 'gathering':
                return (
                    <GatheringMap
                        defaultLocation={defaultLocation}
                        dataState={locationFlow.gatheringState}
                    />
                )
            case 'march':
                return (
                    <MarchMap
                        defaultLocation={defaultLocation}
                        dataState={locationFlow.marchState}
                    />
                )
            case 'picket':
                return (
                    <PicketMap
                        defaultLocation={defaultLocation}
                        dataState={locationFlow.picketState}
                    />
                )
            case 'boycott':
                return (
                    <BoycottMap
                        defaultLocation={defaultLocation}
                        dataState={locationFlow.boycottState}
                    />
                )
            default:
                return null;
        }
    }

    function renderStep(): JSX.Element | null {
        switch (currentStepState.value) {
            case 1:
                return <BasicInfoStep
                    dataState={stepsStates.basicInfo}
                />;

            case 2:
                return (
                    <LocationFlowUI>
                        {getLocationProps()}
                    </LocationFlowUI>
                )

            case 3:
                return <VisualMediaStep
                    dataState={stepsStates.visualMedia}
                />;

            case 4:
                return <LogisticsStep
                    dataState={stepsStates.logistics}
                />;

            default:
                return null;
        }
    }

    function validateCurrentStep(): ValidateCurrentStepResult {
        const stepIndex = currentStepState.value - 1;
        const step = stepsData[stepIndex];

        // TODO: de sters dupa implementarea tuturor validarilor
        if (!step.validator) {
            return { valid: true };
        }

        if (step.key === "location") {
            return { valid: true }; //TODO: De aici controlezi validatorul pentru locatii
        }

        const stepState = stepsStates[step.key];
        const result = step.validator(stepState.value); // eroare dispare dupa ce ai pus toate state type-urile

        // validatorul tău poate returna boolean | string
        if (result === true) { return { valid: true }; }

        return {
            valid: false,
            message: result
        };
    }

    function handleNext(): void {
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

        if (currentStepState.value < stepsData.length) {
            currentStepState.set((value) => value + 1)
        } else {
            // TODO: trimite data catre server
        }
    }

    function handlePrev(): void {
        if (currentStepState.value > 1) currentStepState.set(currentStepState.value - 1);
    }

    return (
        <StepperFlowUI
            currentStepState={currentStepState}
            stepsData={stepsData}
            handleNavigation={{
                handleNext: handleNext,
                handlePrev: handlePrev
            }}
        >
            {renderStep()}
        </StepperFlowUI>

    )
}