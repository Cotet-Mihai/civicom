// ================================================
// MapSearch Types
// ================================================

export type Suggestion = {
    display_name: string;
    lat: string;
    lon: string;
};

// ================================================
// Map / Shape Types
// ================================================

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

/** Props for location step / component */
export type LocationInfoProps = {
    typeProtest?: string;
};