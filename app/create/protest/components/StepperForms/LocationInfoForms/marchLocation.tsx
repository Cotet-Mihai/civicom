import {
    Map, MapDrawControl,
    MapDrawDelete,
    MapDrawEdit,
    MapDrawMarker,
    MapDrawPolyline,
    MapDrawUndo,
    MapTileLayer
} from "@/components/ui/map";
import type { LatLngExpression} from "leaflet";

export default function MarchLocation() {
    const OLD_TOWN_BUCHAREST_COORDINATES = [44.4358196, 26.1021932] satisfies LatLngExpression

    return (
        <Map center={OLD_TOWN_BUCHAREST_COORDINATES}>
            <MapTileLayer/>
            <MapDrawControl>
                <MapDrawMarker />
                <MapDrawPolyline />
                <MapDrawEdit />
                <MapDrawDelete />
                <MapDrawUndo />
            </MapDrawControl>
        </Map>
    )
}