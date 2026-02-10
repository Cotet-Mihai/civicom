import {ComponentType} from "react";
import {StandardStepProp, UseStateWrapper} from "@/features/protest/types/type";



export type TypeProtest = 'gathering' | 'march' | 'picket' | 'boycott' | undefined;

export type BasicInfo = {
    title?: string;
    description?: string;
    date?: Date | undefined;
    time: {
        to: string;
        from: string
    };
    typeProtest?: TypeProtest | undefined;
};

export type UseBasicInfoResult = {
    state: UseStateWrapper<BasicInfo>;
    component: ComponentType<StandardStepProp<BasicInfo>>;
    validator: () => boolean;
    controls: {
        reset: () => void;
    };
};