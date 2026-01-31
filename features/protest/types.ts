import React, {ComponentType, SetStateAction} from "react";
import {LucideIcon} from "lucide-react";

// ================================================
//  Types for Data
// ================================================

export type TypeProtest = "gathering" | "march" | "picket" | "boycott";
export type Step = StepRegistry[keyof StepRegistry];

// ================================================
//  Types for Definition
// ================================================
export type StepDefinition<Key extends string, ContainerProps, Data> = {
    key: Key,
    title: string,
    icon: LucideIcon,
    component: ComponentType<ContainerProps>,
    validator?: (state: Data) => true | string
}

// ================================================
//  Types for Registory
// ================================================
export type StepRegistry = {
    basicInfo: StepDefinition<'basicInfo', BasicInfoProps, BasicInfo>;
    location: StepDefinition<'location', LocationFlowProps, Location>;
    visualMedia: StepDefinition<'visualMedia', VisualMediaProps, VisualMedia>;
    logistics: StepDefinition<'logistics', LogisticsProps, Logistics>;
};

// ================================================
//  Types for Results
// ================================================
export type UseProtestFlowResult = {
    currentStepState: {
        value: number,
        set: (value: SetStateAction<number>) => void
    };
    stepsStates: {
        basicInfo: {
            value: BasicInfo,
            set: (value: SetStateAction<BasicInfo>) => void
        };
        visualMedia: {
            value: VisualMedia,
            set: (value: SetStateAction<VisualMedia>) => void
        };
        logistics: {
            value: Logistics,
            set: (value: SetStateAction<Logistics>) => void
        };
    };
    locationFlow: {
        gatheringState: {
            value: Gathering,
            set: (value: SetStateAction<Gathering>) => void
        },
        marchState: {
            value: March,
            set: (value: SetStateAction<March>) => void
        },
        picketState: {
            value: Picket,
            set: (value: SetStateAction<Picket>) => void
        },
        boycottState: {
            value: Boycott,
            set: (value: SetStateAction<Boycott>) => void
        }
    }
}

export type UseLocationFlow = {
    gatheringState: {
        value: Gathering,
        set: (value: SetStateAction<Gathering>) => void
    },
    marchState: {
        value: March,
        set: (value: SetStateAction<March>) => void
    },
    picketState: {
        value: Picket,
        set: (value: SetStateAction<Picket>) => void
    },
    boycottState: {
        value: Boycott,
        set: (value: SetStateAction<Boycott>) => void
    }
}

// ================================================
//  Types for Step States
// ================================================
export type BasicInfo = {
    title: string;
    description: string;
    date?: Date;
    time: {
        from: string;
        to: string;
    };
    typeProtest?: TypeProtest | undefined;
};

export type Location = undefined | Gathering | March | Picket | Boycott;

export type VisualMedia = unknown;

export type Logistics = unknown;

// ================================================
//  Types for Maps States
// ================================================
export type Coords = {
    lat: number | undefined,
    lng: number | undefined
};

export type Gathering = {
    location: Coords
};

export type March = {
    start: Coords,
    inter: Coords[],
    polylines: Coords[],
    finish: Coords
};

export type Picket = {
    location: Coords
};

export type Boycott = unknown;


// ================================================
//  Types for Props
// ================================================
export type ProtestStepProps<T> = {
    dataState: {
        value: T,
        set: (value: SetStateAction<T>) => void
    }
}

export type BasicInfoProps = ProtestStepProps<BasicInfo>;
export type VisualMediaProps = ProtestStepProps<VisualMedia>;
export type LogisticsProps = ProtestStepProps<Logistics>;

export type LocationMapProps = {
    children: React.ReactNode,
}

export type GatheringProps = LocationMapProps;
export type MarchProps = LocationMapProps;
export type PicketProps = LocationMapProps;
export type BoycottProps = LocationMapProps;

export type LocationFlowProps = GatheringProps | MarchProps | PicketProps | BoycottProps

export type StepperFlowUIProps = {
    children: React.ReactNode,
    currentStepState: {
        value: number,
        set: (patch: Partial<number>) => void
    },
    stepsData: Step[],
    handleNavigation: {
        handleNext: () => void;
        handlePrev: () => void;
    }
}

export type LocationFlowUIProps = {
    children: React.ReactNode,

}

export type MapsProps<T> = {
    dataState: {
        value: T,
        set: (value: SetStateAction<T>) => void;
    },
    defaultLocation: [number, number];
}

// ================================================
//  Validators & Helper Types
// ================================================
export type CheckFieldParams = {
    field: string | Date | undefined;
    name: string;
    missingFields: string[];
};

export type CheckTimeFieldParams = {
    time: {
        from: string;
        to: string;
    } | undefined;
    name: string;
    missingFields: string[];
};

export type ValidateCurrentStepResult = {
    valid: true
} | {
    valid: false,
    message: string
}