'use client'

import {useState} from "react";

import {StepperUI} from "@/app/(private)/creeaza/protest/components/StepperUI";

import useNavigation from "@/app/(private)/creeaza/protest/hooks/useNavigation";
import useBasicInfo from "@/app/(private)/creeaza/protest/hooks/useBasicInfo";

import useDefaultLocationStep from "@/app/(private)/creeaza/protest/hooks/LocationSteps/useDefaultLocationStep";
import useMarchStep from "@/app/(private)/creeaza/protest/hooks/LocationSteps/useMarchStep";
import useBoycottStep from "@/app/(private)/creeaza/protest/hooks/LocationSteps/useBoycottStep";

import useVisualMedia from "@/app/(private)/creeaza/protest/hooks/useVisualMedia";
import useLogistics from "@/app/(private)/creeaza/protest/hooks/useLogisticsStep";

import { createProtest } from '@/app/(private)/creeaza/protest/actions/createProtest';
import {toast} from "sonner";

export default function ProtestFlow() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Hooks for every step
    const basicInfo = useBasicInfo();
    const gatheringLocation = useDefaultLocationStep();
    const marchLocation = useMarchStep();
    const picketLocation = useDefaultLocationStep();
    const boycottLocation = useBoycottStep();
    const visualMedia = useVisualMedia();
    const logistics = useLogistics();

    // All validators for every step
    const validators: (() => boolean)[] = [
        basicInfo.validator,
        gatheringLocation.validator,
        marchLocation.validator,
        picketLocation.validator,
        boycottLocation.validator,
        visualMedia.validator,
        logistics.validator
    ]

    async function handleSubmit() {
        const dataBasicInfo = basicInfo.data
        const dataGathering = gatheringLocation.data
        const dataMarch = marchLocation.data
        const dataPicket = picketLocation.data
        const dataBoycott = boycottLocation.data
        const dataMedia = visualMedia.data
        const dataLogistics = logistics.data

        try {
            setIsSubmitting(true);

            await createProtest(
                dataBasicInfo,
                dataGathering,
                dataMarch,
                dataPicket,
                dataBoycott,
                dataMedia,
                dataLogistics
            )

            toast.success("Protest creat cu succes!");

            // ✅ redirect
            window.location.href = "/proteste"; // sau router.push

        } catch (err) {
            console.error("Submit error:", err);

            // ❌ error toast
            // toast.error("A apărut o eroare!");
        } finally {
            setIsSubmitting(false);
        }
    }

    // Hook for navigation
    const { currentStepState, handleNavigation} = useNavigation({
        validators: validators,
        handleSubmit: handleSubmit,
        isSubmitting: isSubmitting,
        typeProtest: basicInfo.states.type.value
    });

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
                        const Step = gatheringLocation.component;

                        return {
                            component: <Step dataStates={gatheringLocation.states} />,
                        };
                    }
                    case 'picket': {
                        const Step = picketLocation.component;

                        return {
                            component: <Step dataStates={picketLocation.states} />,
                        };
                    }
                    case "march": {
                        const Step = marchLocation.component;
                        const description = 'Trasați traseul pe hartă pentru a continua. (Primul punct pus pe hartă reprezintă startul marșului, iar ultimul reprezintă finalul)'

                        return {
                            component: <Step dataStates={marchLocation.states}/>,
                            description: description
                        };
                    }
                    case "boycott": {
                        const Step = boycottLocation.component;

                        return {
                            component: <Step dataStates={boycottLocation.states}/>,
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
                isSubmitting={isSubmitting}
            >
                {component}
            </StepperUI>
        </div>
    )
}