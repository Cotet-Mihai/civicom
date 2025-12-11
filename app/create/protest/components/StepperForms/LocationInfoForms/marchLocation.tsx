"use client"

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
import L, {LatLngExpression} from "leaflet"

export function MarchLocation() {
    type MarkerShape = {
        id: number;
        type: string | undefined;
        lat: number;
        lng: number;
    };

    type PolylineShape = {
        id: number;
        type: "polyline";
        points: L.LatLng[] | L.LatLng[][] | L.LatLng[][][];
    };

    type Shape = MarkerShape | PolylineShape;

    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression

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
                // ștergem primul marker de acest tip
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
        <Map center={TORONTO_COORDINATES}>
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
    ) : null
}
