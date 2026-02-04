'use client';

import useProtestFlow from "@/features/protest/hooks/useProtestFlow";

import {stepsData} from "@/features/protest/protest.config";

import StepperFlowUI from "@/features/protest/components/StepperFlowUI";



export default function ProtestFlow() {
    const {step, basicInfo, location, visualMedia, logistics} = useProtestFlow();

    function renderStep() {
        switch (step.state.value) {
            case 1: {
                const Step = basicInfo.component;
                return <Step dataState={basicInfo.state}/>;
            }
            case 2: {
                const Step = location.component;
                if (!Step) return ;
                return <Step dataState={location.state}/>;
            }
            case 3: {
                const Step = visualMedia.component;
                return <Step dataState={visualMedia.state}/>;
            }
            case 4: {
                const Step = logistics.component
                return <Step dataState={logistics.state}/>
            }
        }
    }

    return (
        <StepperFlowUI
            currentStepState={step.state}
            stepsData={stepsData}
            handleNavigation={{
                handleNext: step.controls.nextStep,
                handlePrev: step.controls.prevStep
            }}
        >
            {renderStep()}
        </StepperFlowUI>
    )
}