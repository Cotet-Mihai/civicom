import React, { useRef, useState } from "react";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import {
    Map,
    MapDrawControl,
    MapDrawDelete,
    MapDrawEdit, MapDrawMarker,
    MapLocateControl,
    MapTileLayer
} from "@/components/ui/map";
import MapSearchControlWrapper from "@/utils/MapSearch";

export default function GatheringLocation() {
    const OLD_TOWN_BUCHAREST_COORDINATES = [44.4358196, 26.1021932] satisfies LatLngExpression;
    const [searchCoords, setSearchCoords] = useState<[number, number] | null>(null);
    const mapRef = useRef<L.Map | null>(null);

    return (
        <>
            <Map
                center={searchCoords ?? OLD_TOWN_BUCHAREST_COORDINATES}
                zoom={13}
                ref={mapRef}
                className="h-[500px]"
            >
                <MapTileLayer />
                <MapSearchControlWrapper/>
                <MapLocateControl />
                <MapDrawControl>
                    <MapDrawMarker />
                    <MapDrawEdit />
                    <MapDrawDelete />
                </MapDrawControl>
            </Map>
        </>
    );
}