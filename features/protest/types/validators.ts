import {Coords} from "@/features/protest/types/type";
import {PolylineShape} from "@/types/map";

export type TimeField = {
    from: string;
    to: string;
} | undefined;

export type CheckField = {
    field: string | Date | undefined;
    name: string;
    missingFields: string[];
};

export type CheckTimeField= {
    time: TimeField;
    missingFields: string[];
};

export type LocationFiled = {
    location: Coords;
    name: string;
    missingFields: string[];
};

export type MultiLocationFiled = {
    locations: Coords[] | PolylineShape[];
    name: string;
    missingFields: string[]
};
