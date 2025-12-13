import {
    Map,
    MapDrawControl,
    MapDrawDelete,
    MapDrawEdit, MapDrawMarker,
    MapDrawUndo,
    MapLocateControl,
    MapTileLayer
} from "@/components/ui/map";
import type { LatLngExpression } from "leaflet";
import { H4 } from "@/components/Typography";
import React, { useRef, useState } from "react";
import L from "leaflet";
import {MapSearch} from "@/components/MapSeach";

export default function GatheringLocation() {
    const OLD_TOWN_BUCHAREST_COORDINATES = [44.4358196, 26.1021932] satisfies LatLngExpression;
    const [searchCoords, setSearchCoords] = useState<[number, number] | null>(null);
    const mapRef = useRef<L.Map | null>(null);

    return (
        <>
            <H4>Unde ne găsim ?</H4>
            <p className="mb-4 text-gray-400">
                Vă rugăm să utilizați cercul din panoul de control pentru a selecta locația.
            </p>

            <MapSearch mapRef={mapRef} onSelect={setSearchCoords} />

            <Map
                center={searchCoords ?? OLD_TOWN_BUCHAREST_COORDINATES}
                zoom={13}
                ref={mapRef}
                className="h-[500px]"
            >
                <MapTileLayer />
                <MapLocateControl />
                <MapDrawControl>
                    <MapDrawMarker />
                    <MapDrawEdit />
                    <MapDrawDelete />
                    <MapDrawUndo />
                </MapDrawControl>
            </Map>
        </>
    );
}
