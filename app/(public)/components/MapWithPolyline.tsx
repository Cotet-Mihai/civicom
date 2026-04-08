import { Map, MapPolyline, MapTileLayer } from "@/components/ui/map"

export function MapWithPolyline({event_location_routes}: { event_location_routes: [number, number][] }) {

    function getCenter(points: [number, number][]): [number, number] {
        const latSum = points.reduce((sum, [lat]) => sum + lat, 0);
        const lngSum = points.reduce((sum, [, lng]) => sum + lng, 0);

        return [latSum / points.length, lngSum / points.length];
    }
    return (
        <Map center={getCenter(event_location_routes)} zoom={10}>
            <MapTileLayer />
            <MapPolyline positions={event_location_routes} />
        </Map>
    )
}
