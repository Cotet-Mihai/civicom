import L from "leaflet";
import type {LocationDataState} from "@/types/locationInfo";

export type MarchLocationProps = {
    locationDataState: LocationDataState;
}

type MarkerShape = {
    id: number;
    type: string | undefined;
    lat: number;
    lng: number;
};

type PolylineShape = {
    id: number;
    type: "polyline";
    points: L.LatLng[] | L.LatLng[][] | L.LatLng[][][];
};

export type Shape = MarkerShape | PolylineShape;

