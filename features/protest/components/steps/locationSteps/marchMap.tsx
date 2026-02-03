import React, {useRef} from "react";
import type L from "leaflet";

import {defaultLocation} from "@/features/protest/protest.config";

import {
    Map,
    MapDrawControl,
    MapDrawDelete,
    MapDrawEdit, MapDrawMarkerFinish, MapDrawMarkerInter, MapDrawMarkerStart, MapDrawPolyline,
    MapLocateControl,
    MapTileLayer, useLeaflet
} from "@/components/ui/map";

import MapSearchControlWrapper from "@/utils/MapSearch";
import {extractMarkers, extractPolylines, removeDuplicateMarkers} from "@/utils/mapHelper";

import {March} from "@/features/protest/types/locationTypes";
import {StandardStepProp} from "@/features/protest/types/type";
import {MarkerShape, PolylineShape} from "@/types/map";



export default function MarchMap({dataState}: StandardStepProp<March>) {
    const {set: onChange} = dataState;

    const mapRef = useRef<L.Map | null>(null)
    const {L} = useLeaflet();

    const result: March = {
        start: {lat: undefined, lng: undefined},
        inter: [],
        finish: {lat: undefined, lng: undefined},
        polylines: []
    }

    function sortMarkers(markers: MarkerShape[]): March {

        markers.map((marker: MarkerShape) => {
            switch (marker.type) {
                case 'start': {
                    result.start = marker.position;
                    break
                }
                case 'inter': {
                    result.inter.push(marker.position);
                    break
                }
                case 'finish': {
                    result.finish = marker.position
                }
            }
        })
        return result
    }

    function handleOnChange(layers: L.FeatureGroup) {
        removeDuplicateMarkers(layers);

        const markers: MarkerShape[] = extractMarkers(layers);
        const polylines: PolylineShape[] = extractPolylines(layers);

        const result: March = sortMarkers(markers);
        result.polylines.push(...polylines);

        onChange(result);
    }

    return (
        <>
            <Map
                center={defaultLocation}
                zoom={13}
                ref={mapRef}
            >
                <MapTileLayer/>
                <MapSearchControlWrapper/>
                <MapDrawControl
                    onLayersChange={(layers: L.FeatureGroup) => handleOnChange(layers)}
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