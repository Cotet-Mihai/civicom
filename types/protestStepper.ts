import { ComponentType, ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import {GatheringData, MarchData} from "@/types/map";


export type typeProtest = "gathering" | "march" | "picket" | "boycott";

// ================================================
//  ProtestFlow: Form Data Types
// ================================================

/** Centralized state for all steps in the protest hooks */
export type ProtestFlowData = {
    basicInfo: FormDataBasicInfo;
    location?: FormDataLocation;
    visualMedia: FormDataVisualMedia;
    logistics: FormDataLogistics;
};

/** Data for the Basic Info step */
export type FormDataBasicInfo = {
    title: string;
    description: string;
    date?: Date;
    time: {
        from: string;
        to: string;
    };
    typeProtest?: typeProtest | undefined;
};

/** Data for the Location step */
export type FormDataLocation = {
    kind: "gathering";
    gatheringPoint: GatheringData | undefined;
    } | {
    kind: "march";
    marchPoints: MarchData | undefined;
    } | {
    kind: "picket";
    picketPoints: unknown | undefined;
    } | {
    kind: "boycott";
    boycottPoints: unknown | undefined;
    };

/** Data for the Visual Media step (to be defined later) */
export type FormDataVisualMedia = unknown; // TODO: to be defined later

/** Data for the Logistics step (to be defined later) */
export type FormDataLogistics = unknown; // TODO: to be defined later

// ================================================
//  Step & Step Components Types
// ================================================

/** Generic props passed to any step component */
export type StepComponentsProps<T> = {
    typeProtest?: typeProtest;
    data: T;
    onChange: (patch: Partial<T>) => void;
};

/** Props for the Basic Info step component (legacy / specific) */
export type BasicInfoComponentProps = StepComponentsProps<FormDataBasicInfo>;
/** Props for the Basic Info step component (legacy / specific) */
export type LocationComponentProps = StepComponentsProps<FormDataLocation>;

/** Generic type for a single step in the protest hooks */
export type Step<T> = {
    id: keyof ProtestFlowData;            // key to access step's data in flowData
    title: string;                        // step title shown in the stepper
    icon: LucideIcon;                     // icon for the step
    component: ComponentType<StepComponentsProps<T>>; // React component for the step
    validate?: (data: T) => true | string;           // optional validator function
};

/** Union type of all steps for the stepper */
export type AllSteps =
    | Step<FormDataBasicInfo>
    | Step<FormDataLocation>
    | Step<FormDataVisualMedia>
    | Step<FormDataLogistics>;

// ================================================
//  Stepper UI Props
// ================================================

/** Props for a stepper wrapper UI component */
export type StepperFlowUIProps = {
    children: ReactNode;                  // rendered current step component
    currentStep: number;                  // index of the current active step (1-based)
    setCurrentStep: (step: number) => void; // function to change current step
    steps: AllSteps[];                    // array of all steps
    handleNavigation: {
        handleNext: () => void;           // called when Next button is clicked
        handlePrev: () => void;           // called when Prev button is clicked
    };
};

// ================================================
//  Validators & Helper Types
// ================================================

/** Time field type */
export type TimeField = {
    from: string;
    to: string;
} | undefined;

/** Helper type to track missing fields */
export type CheckField = {
    field: string | Date | undefined;
    name: string;
    missingFields: string[];
};

/** Helper type for time validation */
export type CheckTimeField = {
    time: TimeField;
    missingFields: string[];
};
