'use client'

import { useState } from "react";
import { UseLogisticsStepReturn, Contact } from "@/app/(private)/creeaza/protest/types";
import LogisticsStepComponent from "@/app/(private)/creeaza/protest/components/steps/LogisticsStep";

export default function useLogisticsStep(): UseLogisticsStepReturn {
    const [participants, setParticipants] = useState<number | null>(null);
    const [isUnlimited, setIsUnlimited] = useState<boolean>(false);
    const [equipment, setEquipment] = useState<string[]>([]);
    const [safetyRules, setSafetyRules] = useState<string>('');
    const [contacts, setContacts] = useState<Contact[]>([]);

    function validateData(): boolean {
        const missingFields: string[] = [];
        if (!isUnlimited && (participants === null || participants <= 0)) missingFields.push("Numărul de participanți dorit");
        return missingFields.length === 0;
    }

    return {
        states: {
            participants: { value: participants, set: setParticipants },
            isUnlimited: { value: isUnlimited, set: setIsUnlimited },
            equipment: { value: equipment, set: setEquipment },
            safetyRules: { value: safetyRules, set: setSafetyRules },
            contacts: { value: contacts, set: setContacts }
        },
        validator: validateData,
        component: LogisticsStepComponent
    }
}