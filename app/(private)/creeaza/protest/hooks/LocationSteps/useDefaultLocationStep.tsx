'use client'

import {useState} from "react";
import type L from 'leaflet';

import {checkField, showErrorToast} from "@/app/(private)/creeaza/protest/utils";
import {DefaultLocationStep} from "@/app/(private)/creeaza/protest/components/steps/locationSteps/Locationstep.dynamic";

import type {UseDefaultLocationStepReturn} from "@/app/(private)/creeaza/protest/types";



export default function useDefaultLocationStep(): UseDefaultLocationStepReturn {

    const [marker, setMarker] = useState<L.Marker | undefined>(undefined)

    function validator(): boolean {
        const missingFields: string[] = []

        checkField('Locația', marker, missingFields)

        if (missingFields.length > 0) {
            showErrorToast(missingFields);
            return false;
        }
        return true;
    }

    return {
        states: {
            marker: { value: marker, set: setMarker}
        },
        validator: validator,
        component: DefaultLocationStep,
    }
}