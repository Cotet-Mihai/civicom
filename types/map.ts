import L from "leaflet";
// ================================================
// Types for Shapes
// ================================================

// TODO: Verifica sa nu ai conflict aici cu State-urile de la LocationFlow

export type MarkerShape = {
    id: number;
    type?: string;
    lat: number;
    lng: number;
};

export type PolylineShape = {
    id: number;
    type: "polyline";
    points: L.LatLng[] | L.LatLng[][] | L.LatLng[][][];
};

/** Either a marker or a polyline */
export type Shape = MarkerShape | PolylineShape;

// ================================================
// Types for MapSearch
// ================================================

export type Suggestion = {
    display_name: string;
    lat: string;
    lon: string;
};

// ================================================
// Types for MapHelper
// ================================================

export type MapHelpersProps = {
    layers: L.FeatureGroup,
    L: typeof L | null
}