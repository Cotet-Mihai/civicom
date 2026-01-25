import L from "leaflet";
import {JSX, ReactNode} from "react";
import {LucideIcon} from 'lucide-react'

// ProtestFlow types
export interface FormDataBasicInfo {
    title: string;
    description: string;
    date?: Date;
    time: {
        from: string;
        to: string;
    };
    typeProtest?: string;
}

export interface FormDataLocation {
    city?: string;
    meetingPoint?: string;
    finishPoint?: string;
}

export interface FormDataVisualMedia {
    coverImage?: File;
    gallery?: File[];
    videoUrl?: string;
}

export interface FormDataLogistics {
    items?: string[];
    restrictions?: string;
    safetyRules?: string;
}

/**
 * Global form state for the entire protest flow
 */
export interface ProtestFormState {
    basicInfo: FormDataBasicInfo;
    location: FormDataLocation;
    media: FormDataVisualMedia;
    logistics: FormDataLogistics;
}


export type ProtestChildComponentArgs = {
    data:FormDataBasicInfo;
    onChange: (partial: Partial<FormDataBasicInfo>) => void;
}

export type Step = {
    key: string,
    title: string,
    icon: LucideIcon
    component: ({data, onChange}: ProtestChildComponentArgs) => JSX.Element
}

export type StepConfig = {
    key: string,
    title: string,
    icon: LucideIcon
    component: ({data, onChange}: ProtestChildComponentArgs) => JSX.Element
}

export type StepperFlowUIProps = {
    children: ReactNode;
    currentStep: number;
    setCurrentStep: (step: number) => void;
    steps: Step[];
    handleNavigation: {
        handleNext: () => void,
        handlePrev: () => void
    }
};

// ================================================
// BasicInfo types

type MarkerShape = {
    id: number;
    type: string | undefined;
    lat: number;
    lng: number;
};

type PolylineShape = {
    id: number;
    type: "polyline";
    points: L.LatLng[] | L.LatLng[][] | L.LatLng[][][];
};

export type Shape = MarkerShape | PolylineShape;

export type LocationInfoProps = {
    typeProtest?: string;
}