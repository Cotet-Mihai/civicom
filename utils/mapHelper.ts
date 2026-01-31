import {MapHelpersProps, Shape} from "@/types/map";

export function extractShapes({layers, L}: MapHelpersProps): Shape[] | undefined {
    if (!L) return;

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

export function removeDuplicateMarkers({layers, L}: MapHelpersProps): void | undefined {
    const shapes = extractShapes({layers, L});

    if (!shapes) return;

    ["start", "finish" , "marker"].forEach((type) => {
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

export function handleOnLayersChange({layers, L}: MapHelpersProps) {
    removeDuplicateMarkers({layers, L});
    const shapes = extractShapes({layers, L});
    console.log(shapes);
}