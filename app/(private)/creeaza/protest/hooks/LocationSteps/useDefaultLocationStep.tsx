'use client'

import {useState} from "react";
import L, {LatLng} from 'leaflet';

import {checkField, showErrorToast} from "@/app/(private)/creeaza/protest/utils";
import {DefaultLocationStep} from "@/app/(private)/creeaza/protest/components/steps/locationSteps/Locationstep.dynamic";

import {DataDefaultLocation, UseDefaultLocationStepReturn} from "@/app/(private)/creeaza/protest/types";



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

    function getData(): DataDefaultLocation {
        const latLng = marker?.getLatLng()
        return {
            lat: latLng?.lat,
            lng: latLng?.lng
        }
    }

    return {
        states: {
            marker: { value: marker, set: setMarker}
        },
        data: getData(),
        validator: validator,
        component: DefaultLocationStep,
    }
}