import React, { useRef } from "react";
import L from "leaflet";

import {
    Map,
    MapDrawControl,
    MapDrawDelete,
    MapDrawEdit, MapDrawMarkerFinish, MapDrawMarkerInter, MapDrawMarkerStart, MapDrawPolyline,
    MapLocateControl,
    MapTileLayer, useLeaflet
} from "@/components/ui/map";

import MapSearchControlWrapper from "@/utils/MapSearch";
import {removeDuplicateMarkers} from "@/utils/mapHelper";
import {MapsProps, March} from "@/features/protest/types";


export default function MarchMap({dataState, defaultLocation}: MapsProps<March>) {
    const {value: data, set: onChange} = dataState;

    const mapRef = useRef<L.Map | null>(null);

    const {L} = useLeaflet()

    return (
        <>

            <Map
                center={defaultLocation}
                ref={mapRef}
                zoom={13}
            >
                <MapTileLayer/>
                <MapSearchControlWrapper/>
                <MapDrawControl
                    onLayersChange={
                        (layers) => {
                            removeDuplicateMarkers({layers, L})
                        }
                    }
                >
                    <MapDrawMarkerStart/>
                    <MapDrawMarkerInter/>
                    <MapDrawPolyline />
                    <MapDrawMarkerFinish/>
                    <MapDrawEdit />
                    <MapDrawDelete />
                </MapDrawControl>
                <MapLocateControl/>
            </Map>
        </>
    );
}