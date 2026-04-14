'use client'

import { useState } from "react";
import {UseLogisticsStepReturn, Contact, DataLogistics} from "@/app/(private)/creeaza/protest/types";
import LogisticsStepComponent from "@/app/(private)/creeaza/protest/components/steps/LogisticsStep";
import {checkField, showErrorToast} from "@/app/(private)/creeaza/protest/utils";

export default function useLogisticsStep(): UseLogisticsStepReturn {
    const [participants, setParticipants] = useState<number>(0);
    const [isLimited, setIsLimited] = useState<boolean>(false);
    const [equipment, setEquipment] = useState<string[]>([]);
    const [safetyRules, setSafetyRules] = useState<string>('');
    const [contacts, setContacts] = useState<Contact[]>([]);

    function validateData(): boolean {
        const missingFields: string[] = [];

        if (isLimited && (participants === null || participants <= 0)) {
            missingFields.push("Numărul de participanți dorit");
        }
        checkField('Regulile de siguranta', safetyRules, missingFields)

        if (missingFields.length > 0) {
            showErrorToast(missingFields);
            return false;
        }
        return true;
    }

    function getData(): DataLogistics {
        return {
            participants: participants,
            isLimited: isLimited,
            equipment: equipment,
            safetyRules: safetyRules,
            contacts: contacts
        }
    }

    return {
        states: {
            participants: { value: participants, set: setParticipants },
            isLimited: { value: isLimited, set: setIsLimited },
            equipment: { value: equipment, set: setEquipment },
            safetyRules: { value: safetyRules, set: setSafetyRules },
            contacts: { value: contacts, set: setContacts }
        },
        data: getData(),
        validator: validateData,
        component: LogisticsStepComponent
    }
}