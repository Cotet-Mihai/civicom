import {IconType} from "react-icons";
import {JSX} from "react";

export type MarchStep = {
    icon: JSX.Element; // iconița care va fi afișată
    description: string; // textul explicativ
};

export type GatheringStep = {
    icon: JSX.Element; // iconița care va fi afișată
    description: string; // textul explicativ
};

export type StepperSteps = {
    title: string;
    icon: IconType;
    description: string | {gathering: GatheringStep[], march:MarchStep[]}
}