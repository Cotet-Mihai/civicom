'use client'

import {useState} from "react";
import type L from 'leaflet'
import {checkField, showErrorToast} from "@/app/(private)/creeaza/protest/utils";
import {MarchMap} from "@/app/(private)/creeaza/protest/components/steps/locationSteps/Locationstep.dynamic";
import {DataMarchLocation, UseMarchStepReturn} from "@/app/(private)/creeaza/protest/types";

export default function useMarchStep(): UseMarchStepReturn {
    const [polyline, setPolyline] = useState<L.Polyline | undefined>(undefined);

    function validator(): boolean {
        const missingFields: string[] = [];

        checkField('Traseul', polyline, missingFields);

        if (missingFields.length > 0) {
            showErrorToast(missingFields);
            return false;
        }
        return true;
    }

    function getData(): DataMarchLocation {
        const latLngs = polyline?.getLatLngs() as L.LatLng[];

        if (!latLngs) return {
            polylines: []
        } ;

        const pointsArray: number[][] = [];
        latLngs.map((point) => {
            pointsArray.push([point.lat, point.lng]);
        });

        return {
            polylines: pointsArray
        };
    }

    return {
        states: {
            polyline: { value: polyline, set: setPolyline},
        },
        data: getData(),
        validator: validator,
        component: MarchMap,
    }
}