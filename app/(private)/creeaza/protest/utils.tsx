import { toast } from "sonner"
import L, { Layer } from "leaflet";

export function checkField(
    nameField: string,
    field: string | undefined | Date | number,
    missingFields: string[]
) : void {
    if (field === undefined || field === '' || field === 0) {
        missingFields.push(nameField)
    }
}

export function showErrorToast(missingFields: string[]): void {
    (toast.error(
        <div>
            <span className={'font-bold'}>
            Câmpuri lispă:
        </span>
        <ul>
        {missingFields.map((field, index) => (
                <li key={index}>
                            • {field}
    </li>
))}
    </ul>
    </div>
))
}

// MAP TYPES

export function extractMarkers(layers: L.FeatureGroup): L.Marker[] {
    const markers: L.Marker[] = [];

    layers.getLayers().map((layer: Layer) => {
        if (layer instanceof L.Marker) {
            markers.push(layer)
        }
    });

    return markers;
}

export function extractPolylines(layers: L.FeatureGroup): L.Polyline[] {
    const polylines: L.Polyline[] = [];

    layers.getLayers().map((layer: Layer) => {
        if (layer instanceof L.Polyline) {
            polylines.push(layer)
        }
    });

    return polylines;
}

export function extractShapes(layers: L.FeatureGroup): {markers: L.Marker[], polylines: L.Polyline[]} {
    return {
        markers: extractMarkers(layers),
        polylines: extractPolylines(layers)
    }
}

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