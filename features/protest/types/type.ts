import React, {Dispatch, SetStateAction} from "react";
import {Step} from "@/features/protest/types/navigationTypes";
import L from "leaflet";

export type UseStateWrapper<T> = {
    value: T,
    set: Dispatch<SetStateAction<T>>;
};

export type StandardStepProp<T> = {
    dataState: UseStateWrapper<T>
}

export type Coords = {
    lat?: number,
    lng?: number
}

export type PolylineCoords = L.LatLng[] | L.LatLng[][] | L.LatLng[][][]

export type StepperFlowUIProps = {
    children: React.ReactNode,
    currentStepState: UseStateWrapper<number>,
    stepsData: Step[],
    handleNavigation: {
        handleNext: () => void;
        handlePrev: () => void;
    }
}