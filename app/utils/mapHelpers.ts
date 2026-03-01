import L, {Layer} from "leaflet";

export function removeDuplicateMarkers(layers: L.FeatureGroup) {
    const markers: L.Marker[] = extractMarkers(layers);

    if (markers.length <= 1) return;

    const lastMarker: L.Marker = markers[markers.length - 1];

    markers.forEach((marker: L.Marker) => {
        if (marker !== lastMarker) {
            layers.removeLayer(marker)
        }
    })
}

export function extractMarkers(layers: L.FeatureGroup): L.Marker[] {
    const markers: L.Marker[] = [];

    layers.getLayers().map((layer: Layer) => {
        if (layer instanceof L.Marker) {
            markers.push(layer)
        }
    });

    return markers;
}