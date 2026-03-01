'use client'

import {useState} from "react";
import {ProtestType, UseBasicInfoReturn} from "@/app/(private)/creeaza/protest/types";
import BasicInfoStep from "@/app/(private)/creeaza/protest/components/steps/BasicInfoStep";
import {checkField, showErrorToast} from "@/app/(private)/creeaza/protest/utils";



export default function useBasicInfo(): UseBasicInfoReturn {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [fromTime, setFromTime] = useState<string>('');
    const [toTime, setToTime] = useState<string>('');
    const [type, setType] = useState<ProtestType>('');



    function validateData(): boolean {
        const missingFields: string[] = [];

        checkField('Tipul protestului', type, missingFields)
        checkField('Titlu', title, missingFields)
        checkField('Descriere', description, missingFields)
        checkField('Data', date, missingFields)
        checkField('Când începe protestul', fromTime, missingFields)
        checkField('Până când ține protestul', toTime, missingFields)

        if (missingFields.length > 0) {
            showErrorToast(missingFields);
            return false;
        }
        return true;
    }

    return {
        states: {
            title: {value: title, set: setTitle},
            description: {value: description, set: setDescription},
            date: {value: date, set: setDate},
            fromTime: {value: fromTime, set: setFromTime},
            toTime: {value: toTime, set: setToTime},
            type: {value: type, set: setType}
        },
        validator: validateData,
        component: BasicInfoStep
    }
}