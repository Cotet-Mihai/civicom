'use client'

import {Camera, Info, ListTodo, MapPin} from "lucide-react";
import StepperTitleStatus from "@/components/StepperTitleStatus";
import BasicInfo from "@/app/create/protest/components/StepperForms/BasicInfo";
import {JSX, useState} from "react";
import {validateBasicInfo} from "@/lib/createValidation/protest"
import LocationInfo from "@/app/create/protest/components/StepperForms/LocationInfo";
import {StepperSteps} from "@/types/stepper";

const stepperSteps: StepperSteps[] = [
    {title: 'Informații de bază', icon: Info}, //titlu, descriere, data si ora, tipul protestului
    {title: 'Locație', icon: MapPin}, // locatie, punct de intalnire, optional finish
    {title: 'Media vizuală', icon: Camera}, //imagine principala, galerie de iamgini, optional video, (sa ai optiunea de al descarca din browser)
    {title: 'Logistică', icon: ListTodo}, // Ce sa aduca participantii(pancarte, steaguri, vuvuzele, bannere), restirctii, reguli de siguranta
];

export default function StepperContainer() {

    // Title
    const [title, setTitle] = useState('');
    // Description
    const [description, setDescription] = useState('');
    // Calendar
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [fromTime, setFromTime] = useState('10:30:00');
    const [toTime, setToTime] = useState('12:30:00');
    // Tipul de protest
    const [typeProtest, setTypeProtest] = useState<string | undefined>(undefined);
    //Step of Stepper
    const [currentStep, setCurrentStep] = useState(1);

    const basicInfoContainer = (
        <BasicInfo
            titleState={{title, setTitle}}
            descriptionState={{description, setDescription}}
            dateState={{date, setDate}}
            fromTimeState={{fromTime, setFromTime}}
            toTimeState={{toTime, setToTime}}
            typeState={{ type: typeProtest, setType: setTypeProtest }}
        />
    )

    const locationInfoContainer = (
        <LocationInfo typeProtest={typeProtest}/>
    )

    const formSteps: JSX.Element[] = [
        basicInfoContainer,
        locationInfoContainer
    ]

    function handleNextStep() {
        if (currentStep === 1) {
            return validateBasicInfo({
                title,
                description,
                date,
                fromTime,
                toTime,
                type: typeProtest,
            });
        } return true
    }

    return (
        <StepperTitleStatus
            steps={stepperSteps}
            stepsState={{currentStep, setCurrentStep}}
            onValidateNext={handleNextStep}
        >
            {formSteps[currentStep - 1]}
        </StepperTitleStatus>
    )
}