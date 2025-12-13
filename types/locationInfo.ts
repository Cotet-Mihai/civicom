import type {Shape} from "@/types/marchLocation";

export type LocationInfoProps = {
    typeProtest?: string;
    locationDataState: LocationDataState;
}

export type LocationDataState = {
    locationData: Shape[] | undefined;
    setLocationData: (locationData: Shape[] | undefined) => void;
}