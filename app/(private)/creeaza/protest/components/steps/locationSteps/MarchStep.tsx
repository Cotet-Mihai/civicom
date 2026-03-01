'use client';

import React, {JSX, useEffect} from "react";
import type L from "leaflet";

import {defaultLocation} from "@/app/(private)/creeaza/protest/data";

import {
    Map,
    MapDrawControl,
    MapDrawDelete,
    MapDrawEdit, MapDrawPolyline, MapFullscreenControl,
    MapLocateControl,
    MapTileLayer
} from "@/components/ui/map";
import {MarchStepProps} from "@/app/(private)/creeaza/protest/types";
import {
    extractPolylines,
    removeDuplicatePolylines,
    MapSearchControlWrapper
} from "@/utils/mapHelpers";




export default function MarchMap({dataStates}: MarchStepProps ): JSX.Element {

    useEffect(() => {
        dataStates.polyline.set(undefined)
    }, []);

    function handleOnChange(layers: L.FeatureGroup) {
        removeDuplicatePolylines(layers);

        const polylines: L.Polyline[] = extractPolylines(layers);

        dataStates.polyline.set(polylines[0])
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
                <MapDrawPolyline />
                <MapDrawEdit />
                <MapDrawDelete />
            </MapDrawControl>
        </Map>
    );
}