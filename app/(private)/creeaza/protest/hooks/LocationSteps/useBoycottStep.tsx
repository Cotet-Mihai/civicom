'use client'

import {useState} from "react";
import {checkField, showErrorToast} from "@/app/(private)/creeaza/protest/utils";
import BoycottStep from "@/app/(private)/creeaza/protest/components/steps/locationSteps/BoycottStep";
import {type Brand, DataBoycott, UseBoycottStepReturn} from "@/app/(private)/creeaza/protest/types";

export default function useBoycottStep(): UseBoycottStepReturn {
    const [reason, setReason] = useState<string>("")
    const [method, setMethod] = useState<string>("")
    const [brands, setbrands] = useState<Brand[]>([])

    function validator(): boolean {
        const missingFields: string[] = [];

        checkField('Motivul', reason, missingFields);
        checkField('Modul de operare', method, missingFields);
        checkField('Brandul/Brandurile', brands, missingFields);

        if (missingFields.length > 0) {
            showErrorToast(missingFields);
            return false;
        }
        return true;
    }

    function getData(): DataBoycott {
        return {
            reason: reason,
            method: method,
            brands: brands
        }
    }

    return {
        states: {
            reason: { value: reason, set: setReason},
            method: { value: method, set: setMethod},
            brands: { value: brands, set: setbrands}
        },
        data: getData(),
        validator: validator,
        component: BoycottStep,
    }
}