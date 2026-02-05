import {ComponentType} from "react";

import {Coords, StandardStepProp, UseStateWrapper} from "@/features/protest/types/type";
import {PolylineShape} from "@/types/map";



export type Gathering = {
    location: Coords;
};

export type March = {
    start: Coords;
    inter: Coords[];
    finish: Coords;
    polylines: PolylineShape[];
};

export type Picket = {
    location: Coords;
};

export type Boycott = unknown;

export type LocationStepResult<T> = {
    state: UseStateWrapper<T>;
    component: ComponentType<StandardStepProp<T>>;
};

export type LocationStepRegistry = {
    gathering: LocationStepResult<Gathering>;
    march: LocationStepResult<March>;
    picket: LocationStepResult<Picket>;
    boycott: LocationStepResult<Boycott>;
};