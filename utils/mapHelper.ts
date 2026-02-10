import L, { Layer } from "leaflet";
import {ExtractShapes, MarkerShape, MarkerType, PolylineShape} from "@/types/map";

/**
 * Extracts all marker shapes from a given Leaflet FeatureGroup.
 *
 * @param layers - The Leaflet FeatureGroup containing map layers.
 * @returns An array of MarkerShape objects representing all markers in the group.
 */
export function extractMarkers(layers: L.FeatureGroup): MarkerShape[] {
    const markers: MarkerShape[] = [];

    layers.getLayers().map((layer: Layer) => {
        if (layer instanceof L.Marker) {
            const id: number = L.Util.stamp(layer);
            const icon = layer.getIcon();
            const { lat, lng } = layer.getLatLng();

            markers.push({
                id: id,
                type: icon.options.className as MarkerType,
                position: { lat, lng }
            });
        }
    });

    return markers;
}

/**
 * Extracts all polyline shapes from a given Leaflet FeatureGroup.
 *
 * @param layers - The Leaflet FeatureGroup containing map layers.
 * @returns An array of PolylineShape objects representing all polylines in the group.
 */
export function extractPolylines(layers: L.FeatureGroup): PolylineShape[] {
    const polylines: PolylineShape[] = [];

    layers.getLayers().map((layer: Layer) => {
        if (layer instanceof L.Polyline) {
            const id: number = L.Util.stamp(layer);
            const points = layer.getLatLngs();

            polylines.push({
                id: id,
                type: "polyline",
                points: points
            });
        }
    });

    return polylines;
}

/**
 * Extracts both markers and polylines from a Leaflet FeatureGroup.
 *
 * @param layers - The Leaflet FeatureGroup containing map layers.
 * @returns An object containing arrays of markers and polylines.
 */
export function extractShapes(layers: L.FeatureGroup): ExtractShapes {
    return { markers: extractMarkers(layers), polylines: extractPolylines(layers) };
}

/**
 * Removes duplicate markers of specific types ("start", "finish", "marker") from a FeatureGroup.
 * Keeps only the first marker of each type and removes subsequent duplicates.
 *
 * @param layers - The Leaflet FeatureGroup containing map layers.
 */
export function removeDuplicateMarkers(layers: L.FeatureGroup): void {
    const shapes: MarkerShape[] = extractMarkers(layers);

    if (!shapes) return;

    ["start", "finish", "marker"].forEach((type) => {
        const markersOfType: MarkerShape[] = shapes.filter(s => s.type === type);

        if (markersOfType.length > 1) {
            const firstId: number = markersOfType[0].id;
            const layerToRemove: Layer | undefined = layers.getLayer(firstId);

            if (layerToRemove) {
                layers.removeLayer(layerToRemove);
            }
        }
    });
}

// TODO: fa o functie care sa stearga dublurile de polylines
