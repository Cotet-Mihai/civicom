'use client'

import {StepperUI} from "@/app/(private)/creeaza/protest/components/StepperUI";
import useBasicInfo from "@/app/(private)/creeaza/protest/hooks/useBasicInfo";
import useNavigation from "@/app/(private)/creeaza/protest/hooks/useNavigation";


export default function ProtestFlow() {

    const basicInfo = useBasicInfo();

    const validators = [
        basicInfo.validator
    ]

    const { currentStepState, handleNavigation } = useNavigation(validators);

    function getComponentByStep() {
        switch (currentStepState.value) {
            case 1: {
                const Step = basicInfo.component
                return <Step dataStates={basicInfo.states}/>
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