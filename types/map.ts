import L from "leaflet";
import {Coords, PolylineCoords} from "@/features/protest/types/type";
// ================================================
// Types for Shapes
// ================================================

export type MarkerType = 'marker' | 'start' | 'inter' | 'finish'

export type MarkerShape = {
    id: number;
    type: MarkerType | undefined;
    position: Coords;
};

export type PolylineShape = {
    id: number;
    type: 'polyline';
    points: PolylineCoords;
};

export type Shape = MarkerShape | PolylineShape;

// ================================================
// Types for MapHelper
// ================================================

export type ExtractShapes = {
    markers: MarkerShape[],
    polylines: PolylineShape[]
}

// ================================================
// Types for MapSearch
// ================================================

export type Suggestion = {
    display_name: string;
    lat: string;
    lon: string;
};