'use client';

import React, {JSX, useEffect} from "react";
import type L from "leaflet";

import {
    Map,
    MapDrawControl,
    MapDrawDelete,
    MapDrawEdit, MapDrawMarker,
    MapLocateControl,
    MapTileLayer,
    MapFullscreenControl
} from "@/components/ui/map";

import {defaultLocation} from "@/app/(private)/creeaza/protest/data";
import {extractMarkers, MapSearchControlWrapper, removeDuplicateMarkers} from "@/utils/mapHelpers";

import {DefaultLocationStepProps} from "@/app/(private)/creeaza/protest/types";



export default function DefaultLocationStep({dataStates}: DefaultLocationStepProps): JSX.Element {

    useEffect(() => {
        dataStates.marker.set(undefined)
    }, []);

    function handleOnChange(layers: L.FeatureGroup) {
        removeDuplicateMarkers(layers)

        const markers: L.Marker[] = extractMarkers(layers)

        dataStates.marker.set(markers[0])
    }

    return (
        <Map
            center={defaultLocation}
            zoom={13}
        >
            <MapTileLayer />
            <MapSearchControlWrapper/>
            <MapLocateControl />
            <MapFullscreenControl />
            <MapDrawControl onLayersChange={(layers: L.FeatureGroup) => handleOnChange(layers)}>
                <MapDrawMarker />
                <MapDrawEdit />
                <MapDrawDelete />
            </MapDrawControl>
        </Map>
    );
}