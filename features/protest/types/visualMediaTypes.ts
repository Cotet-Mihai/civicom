import {StandardStepProp, UseStateWrapper} from "@/features/protest/types/type";
import {ComponentType} from "react";

export type VisualMedia = unknown;

export type UseVisualMediaResult = {
    state: UseStateWrapper<VisualMedia>;
    component: ComponentType<StandardStepProp<VisualMedia>>;
    validator: () => boolean;
};