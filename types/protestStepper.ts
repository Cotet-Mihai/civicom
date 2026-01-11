import L from "leaflet";


export type BaiscInfo = {
    titleState: {
        title: string;
        setTitle: (title: string) => void;
    },
    descriptionState: {
        description: string;
        setDescription: (description: string) => void;
    },
    dateState: {
        date: Date | undefined,
        setDate: (date: Date | undefined) => void
    },
    fromTimeState: {
        fromTime: string,
        setFromTime: (fromTime: string) => void
    },
    toTimeState: {
        toTime: string,
        setToTime: (toTime: string) => void
    },
    typeState: {
        type: string | undefined,
        setType: (type: string | undefined) => void
    }
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

export type LocationInfoProps = {
    typeProtest?: string;
}