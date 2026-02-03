import React, {JSX} from "react";
import type L from "leaflet";

import {defaultLocation} from "@/features/protest/protest.config";

import {
    Map,
    MapDrawControl,
    MapDrawDelete,
    MapDrawEdit, MapDrawMarker,
    MapLocateControl,
    MapTileLayer
} from "@/components/ui/map";

import MapSearchControlWrapper from "@/utils/MapSearch";
import {extractMarkers, removeDuplicateMarkers} from "@/utils/mapHelper";

import {StandardStepProp} from "@/features/protest/types/type";
import {Gathering} from "@/features/protest/types/locationTypes";
import {MarkerShape} from "@/types/map";

export default function GatheringMap({dataState}: StandardStepProp<Gathering>): JSX.Element {
    const {set: onChange} = dataState;

    function handleOnChange(layers: L.FeatureGroup) {
        removeDuplicateMarkers(layers);

        const marker: MarkerShape = extractMarkers(layers)[0];

        onChange((prev: Gathering) => ({
                ...prev,
                location: {
                    lat: marker.position.lat,
                    lng: marker.position.lng
                },
            })
        );
    }

    return (
        <Map
            center={defaultLocation}
            zoom={13}
        >
            <MapTileLayer />
            <MapSearchControlWrapper/>
            <MapLocateControl />
            <MapDrawControl
                onLayersChange={(layers: L.FeatureGroup) => handleOnChange(layers)}
            >
                <MapDrawMarker />
                <MapDrawEdit />
                <MapDrawDelete />
            </MapDrawControl>
        </Map>
    );
}