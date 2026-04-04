'use client'

import {StepperUI} from "@/app/(private)/creeaza/protest/components/StepperUI";

import useNavigation from "@/app/(private)/creeaza/protest/hooks/useNavigation";
import useBasicInfo from "@/app/(private)/creeaza/protest/hooks/useBasicInfo";
import useLocationStep from "@/app/(private)/creeaza/protest/hooks/useLocationStep";


import useDefaultLocationStep from "@/app/(private)/creeaza/protest/hooks/LocationSteps/useDefaultLocationStep";
import useMarchStep from "@/app/(private)/creeaza/protest/hooks/LocationSteps/useMarchStep";
import useBoycottStep from "@/app/(private)/creeaza/protest/hooks/LocationSteps/useBoycottStep";


import useVisualMedia from "@/app/(private)/creeaza/protest/hooks/useVisualMedia";
import useLogistics from "@/app/(private)/creeaza/protest/hooks/useLogisticsStep";



export default function ProtestFlow() {
    // Hooks for every step
    const basicInfo = useBasicInfo();
    const location = useLocationStep(basicInfo.states.type.value);
    const visualMedia = useVisualMedia();
    const logistics = useLogistics();

    // All validators for every step
    const validators: (() => boolean)[] = [
        basicInfo.validator,
        location.validator,
        visualMedia.validator,
        logistics.validator
    ]

    // Hook for navigation
    const { currentStepState, handleNavigation } = useNavigation(validators);

    // Depending on the current step returns the component with its parameters and description for Stepper
    // (if a particular step does not exist, the first step is returned)
    function getComponentByStep(){
        switch (currentStepState.value) {
            default: {
                const Step = basicInfo.component
                return {
                    component: <Step dataStates={basicInfo.states}/>,
                    description: ''
                }
            }

            case 2: {
                switch (basicInfo.states.type.value) {
                    default: {
                        const gathering = location as ReturnType<typeof useDefaultLocationStep>;
                        const Step = gathering.component;

                        return {
                            component: <Step dataStates={gathering.states} />,
                        };
                    }

                    case "march": {
                        const march = location as ReturnType<typeof useMarchStep>;
                        const Step = march.component;
                        const description = 'Trasați traseul pe hartă pentru a continua. (Primul punct pus pe hartă reprezintă startul marșului, iar ultimul reprezintă finalul)'

                        return {
                            component: <Step dataStates={march.states}/>,
                            description: description
                        };
                    }

                    case "boycott": {
                        const boycott = location as ReturnType<typeof useBoycottStep>;
                        const Step = boycott.component;

                        return {
                            component: <Step dataStates={boycott.states}/>,
                        };
                    }
                }

            }

            case 3: {
                const Step = visualMedia.component
                return {
                    component: <Step dataStates={visualMedia.states}/>
                }
            }

            case 4: {
                const Step = logistics.component
                return {
                    component: <Step dataStates={logistics.states}/>
                }
            }

        }
    }

    const { component, description='' } = getComponentByStep()

    return (
        <div className={'w-full'}>
            <StepperUI
                currentStep={currentStepState}
                handleNavigation={handleNavigation}
                description={description}
            >
                {component}
            </StepperUI>
        </div>
    )
}