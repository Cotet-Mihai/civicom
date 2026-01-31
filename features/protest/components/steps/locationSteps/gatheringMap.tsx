import React, { useRef } from "react";
import L from "leaflet";

import {
    Map,
    MapDrawControl,
    MapDrawDelete,
    MapDrawEdit, MapDrawMarker,
    MapLocateControl,
    MapTileLayer, useLeaflet
} from "@/components/ui/map";

import {Gathering, MapsProps} from "@/features/protest/types";

import MapSearchControlWrapper from "@/utils/MapSearch";
import {removeDuplicateMarkers} from "@/utils/mapHelper";

export default function GatheringMap({dataState, defaultLocation}: MapsProps<Gathering>) {
    const {value: data, set: onChange} = dataState;

    const mapRef = useRef<L.Map | null>(null);

    const {L} = useLeaflet()

    return (
        <>
            <Map
                center={defaultLocation}
                zoom={13}
                ref={mapRef}
                className="h-[500px]"
            >
                <MapTileLayer />
                <MapSearchControlWrapper/>
                <MapLocateControl />
                <MapDrawControl
                    onLayersChange={
                        (layers) => {
                            removeDuplicateMarkers({layers, L})
                        }
                    }
                >
                    <MapDrawMarker />
                    <MapDrawEdit />
                    <MapDrawDelete />
                </MapDrawControl>
            </Map>
        </>
    );
}