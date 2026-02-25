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
    MapSearchControl,
    MapFullscreenControl
} from "@/components/ui/map";

import {defaultLocation} from "@/app/(private)/creeaza/protest/data";
import {GatheringStepProps} from "@/app/(private)/creeaza/protest/types";
import {extractMarkers, removeDuplicateMarkers} from "@/app/(private)/creeaza/protest/utils";


export default function GatheringStep({dataState}: GatheringStepProps): JSX.Element {

    useEffect(() => {
        dataState.lat.set(0)
        dataState.lng.set(0)
    }, []);

    function handleOnChange(layers: L.FeatureGroup) {
        const markers = extractMarkers(layers)

        if (markers.length === 0) {
            dataState.lat.set(0)
            dataState.lng.set(0)
            return
        }

        removeDuplicateMarkers(layers)

        const marker = markers[0]
        if (!marker) return

        const { lat, lng } = marker.getLatLng()

        dataState.lat.set(lat)
        dataState.lng.set(lng)
    }

    return (
        <Map
            center={defaultLocation}
            zoom={13}
        >
            <MapTileLayer />
            <MapSearchControl/>
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