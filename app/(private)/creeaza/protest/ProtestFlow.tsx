'use client'

import {StepperUI} from "@/app/(private)/creeaza/protest/components/StepperUI";
import useBasicInfo from "@/app/(private)/creeaza/protest/hooks/useBasicInfo";
import useNavigation from "@/app/(private)/creeaza/protest/hooks/useNavigation";
import useLocationStep from "@/app/(private)/creeaza/protest/hooks/useLocationStep";



export default function ProtestFlow() {

    const basicInfo = useBasicInfo();
    const location = useLocationStep(basicInfo.states.type.value)

    const validators: (() => boolean)[] = [
        basicInfo.validator,
        location?.validator,
    ]

    const { currentStepState, handleNavigation } = useNavigation(validators);

    function getComponentByStep() {
        switch (currentStepState.value) {
            case 1: {
                const Step = basicInfo.component
                return <Step dataStates={basicInfo.states}/>
            }
            case 2: {
                const Step = location.component
                return <Step dataState={location.states}/>
            }
        }
    }


    return (
        <div className={'w-full'}>
            <StepperUI
                currentStep={currentStepState}
                handleNavigation={handleNavigation}
            >
                {getComponentByStep()}
            </StepperUI>
        </div>
    )
}