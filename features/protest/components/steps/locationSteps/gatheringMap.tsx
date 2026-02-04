'use client';

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


import MapSearchControlWrapper from "@/utils/MapSearch";
import {removeDuplicateMarkers} from "@/utils/mapHelper";
import {defaultLocation} from "@/features/protest/protest.config";

// @ts-expect-error just for testing
export default function GatheringMap({dataState}) {
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
                            // @ts-expect-error just for testing
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