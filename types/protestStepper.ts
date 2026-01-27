import L from "leaflet";
import { JSX, ReactNode } from "react";
import { LucideIcon } from "lucide-react";

// ================================================
// ProtestFlow: Form Data Types
// ================================================

export type FormDataBasicInfo = {
    title: string;
    description: string;
    date?: Date;
    time: {
        from: string | undefined;
        to: string | undefined;
    };
    typeProtest?: string;
}

export type FormDataLocation = {
    title: string;
    description: string;
    date?: Date;
    time: {
        from: string | undefined;
        to: string | undefined;
    };
    typeProtest?: string;
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

// ================================================
// ProtestFlow: Step & Validation Types
// ================================================

/** Props passed to each step component */
export type ProtestChildComponentArgs = {
    data: FormDataBasicInfo;
    onChange: (partial: Partial<FormDataBasicInfo>) => void;
};

/** Single step in the protest flow */
export type Step = {
    title: string;
    icon: LucideIcon;
    component: (props: ProtestChildComponentArgs) => JSX.Element;
    validator?: () => boolean | string;
};

/** Props for a stepper UI wrapper */
export type StepperFlowUIProps = {
    children: ReactNode;
    currentStep: number;
    setCurrentStep: (step: number) => void;
    steps: Step[];
    handleNavigation: {
        handleNext: () => void;
        handlePrev: () => void;
    };
};

// ================================================
// BasicInfo Validators
// ================================================
export type TimeField = {
    from: string;
    to: string
} | undefined;

export type CheckField = {
    field: string | Date | undefined,
    name: string,
    missingFields: string[]
}

export type CheckTimeField= {
    time: TimeField,
    missingFields: string[]
}

// ================================================
// Location: Map / Shape Types
// ================================================

export type MarkerShape = {
    id: number;
    type?: string;
    lat: number;
    lng: number;
};

export type PolylineShape = {
    id: number;
    type: "polyline";
    points: L.LatLng[] | L.LatLng[][] | L.LatLng[][][];
};

/** Either a marker or a polyline */
export type Shape = MarkerShape | PolylineShape;

/** Props for location step / component */
export type LocationInfoProps = {
    typeProtest?: string;
};