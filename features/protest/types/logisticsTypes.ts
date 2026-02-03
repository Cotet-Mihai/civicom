import {ComponentType} from "react";
import {StandardStepProp, UseStateWrapper} from "@/features/protest/types/type";



export type Logistics = unknown;

export type UseLogisticsStep = {
    state: UseStateWrapper<Logistics>;
    component: ComponentType<StandardStepProp<Logistics>>;
    validator: () => boolean;
}