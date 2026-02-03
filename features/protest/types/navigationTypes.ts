import {UseStateWrapper} from "@/features/protest/types/type";
import {LucideIcon} from "lucide-react";


export type Step = {
    title: string,
    icon: LucideIcon
}

export type UseNavigationResults = {
    state: UseStateWrapper<number>;
    controls: {
        nextStep: () => void;
        prevStep: () => void;
    };
};