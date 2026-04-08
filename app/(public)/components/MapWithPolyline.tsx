import {Map, MapMarker, MapPolyline, MapTileLayer} from "@/components/ui/map"

export function MapWithPolyline({event_location_routes}: { event_location_routes: [number, number][] }) {
    const start = event_location_routes[0]
    const finish = event_location_routes.at(-1)

    function getCenter(points: [number, number][]): [number, number] {
        const latSum = points.reduce((sum, [lat]) => sum + lat, 0);
        const lngSum = points.reduce((sum, [, lng]) => sum + lng, 0);

        return [latSum / points.length, lngSum / points.length];
    }

    if (!finish) return
    return (
        <Map center={getCenter(event_location_routes)} zoom={13}>
            <MapTileLayer />
            <MapPolyline positions={event_location_routes} />
            <MapMarker  position={start} icon={<span className={'bg-primary font-bold p-2 rounded-full text-primary-foreground'}>START</span>}/>
            <MapMarker position={finish} icon={<span className={'bg-secondary font-bold p-2 rounded-full text-secondary-foreground'}>FINAL</span>} />
        </Map>
    )
}
