import L from "leaflet";

export type ProtestType = '' | 'gathering' | 'march' | 'picket' | 'boycott'

export type BasicInfoStates = {
    title: {value: string, set: (value: string) => void},
    description: {value: string, set: (value: string) => void},
    date: {value: Date | undefined, set: (value: Date | undefined) => void},
    fromTime: {value: string, set: (value: string) => void},
    toTime: {value: string, set: (value: string) => void},
    type: {value: ProtestType, set: (value: ProtestType) => void}
}

export type GateringStates = {
    lat: {value: number, set: (value: number)=> void},
    lng: {value: number, set: (value: number)=> void},
}



export type MarkerShape = {
    id: number,
    lat: number,
    lng: number
}

export type PolylineShape = {
    id: number;
    points: L.LatLng[] | L.LatLng[][] | L.LatLng[][][];
};

export type Shape = MarkerShape | PolylineShape

