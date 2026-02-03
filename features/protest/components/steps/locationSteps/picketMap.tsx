import React from "react";
import L from "leaflet";

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
import {Picket} from "@/features/protest/types/locationTypes";
import {MarkerShape} from "@/types/map";

export default function PicketMap({dataState}: StandardStepProp<Picket>) {
    const {set: onChange} = dataState;

    function handleOnChange(layers: L.FeatureGroup) {
        removeDuplicateMarkers(layers);

        const marker: MarkerShape = extractMarkers(layers)[0];

        onChange((prev: Picket) => ({
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