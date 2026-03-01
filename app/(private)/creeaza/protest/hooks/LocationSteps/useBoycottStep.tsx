'use client'

import {useState} from "react";
import {checkField, showErrorToast} from "@/app/(private)/creeaza/protest/utils";
import BoycottStep from "@/app/(private)/creeaza/protest/components/steps/locationSteps/BoycottStep";
import {type Brand, UseBoycottStepReturn} from "@/app/(private)/creeaza/protest/types";

export default function useBoycottStep(): UseBoycottStepReturn {
    const [reason, setReason] = useState<string>("")
    const [operation, setOperation] = useState<string>("")
    const [brands, setBrands] = useState<Brand[]>([])

    function validator(): boolean {
        const missingFields: string[] = [];

        checkField('Motivul', reason, missingFields);
        checkField('Modul de operare', operation, missingFields);
        checkField('Brandul/Brandurile', brands, missingFields);

        if (missingFields.length > 0) {
            showErrorToast(missingFields);
            return false;
        }
        return true;
    }

    return {
        states: {
            reason: { value: reason, set: setReason},
            operation: { value: operation, set: setOperation},
            brands: { value: brands, set: setBrands}
        },
        validator: validator,
        component: BoycottStep,
    }
}