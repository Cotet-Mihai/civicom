"use client"

import {useRef, useState} from "react";
import L, {LatLngExpression} from "leaflet"
import {
    Map,
    MapDrawControl,
    MapDrawDelete,
    MapDrawEdit,
    MapDrawMarkerFinish,
    MapDrawMarkerInter,
    MapDrawMarkerStart,
    MapDrawPolyline,
    MapDrawUndo,
    MapLocateControl,
    MapTileLayer,
    useLeaflet,
} from "@/components/ui/map"
import {MapSearch} from "@/components/MapSearch";
import type { Shape } from "@/types/protestStepper"


export function MarchLocation() {

    const OLD_TOWN_BUCHAREST_COORDINATES = [44.4358196, 26.1021932] satisfies LatLngExpression;
    const [searchCoords, setSearchCoords] = useState<[number, number] | null>(null);
    const mapRef = useRef<L.Map | null>(null);

    const {L} = useLeaflet()

    function extractShapes(layers: L.FeatureGroup): Shape[] {
        if (!L) return [];

        const shapes: Shape[] = [];

        layers.getLayers().map((layer) => {
            const id = L.Util.stamp(layer)

            if (layer instanceof L.Marker) {
                const pos = layer.getLatLng();
                const icon = layer.getIcon();

                shapes.push({
                    id: id,
                    type: icon.options.className,
                    lat: pos.lat,
                    lng: pos.lng,
                });

            } else if (layer instanceof L.Polyline) {
                shapes.push({
                    id: id,
                    type: "polyline",
                    points: layer.getLatLngs()
                });
            }


        });

        return shapes;
    }

    function removeDuplicateMarkers(layers: L.FeatureGroup) {
        const shapes = extractShapes(layers);

        ["start", "finish"].forEach((type) => {
            const markersOfType = shapes.filter(s => s.type === type);
            if (markersOfType.length > 1) {
                const firstId = markersOfType[0].id;
                const layerToRemove = layers.getLayer(firstId);
                if (layerToRemove) {
                    layers.removeLayer(layerToRemove);
                }
            }
        });
    }

    function handleOnLayersChange(layers: L.FeatureGroup) {
        if (!L) return;
        removeDuplicateMarkers(layers);
        const shapes = extractShapes(layers);
        console.log(shapes);
    }

    return L ? (
        <>
            <MapSearch mapRef={mapRef} onSelect={setSearchCoords}/>
            <Map center={searchCoords ?? OLD_TOWN_BUCHAREST_COORDINATES} ref={mapRef} zoom={13}>
                <MapTileLayer/>
                <MapDrawControl
                    onLayersChange={(layers) => {
                        handleOnLayersChange(layers)
                    }
                    }
                >
                    <MapDrawMarkerStart/>
                    <MapDrawMarkerInter/>
                    <MapDrawMarkerFinish/>
                    <MapDrawPolyline />
                    <MapDrawEdit />
                    <MapDrawDelete />
                    <MapDrawUndo />
                </MapDrawControl>
                <MapLocateControl/>
            </Map>
        </>
    ) : null
}