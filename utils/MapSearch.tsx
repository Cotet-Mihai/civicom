import {useMap} from "react-leaflet";
import React from "react";
import {LatLngExpression} from "leaflet";
import {MapSearchControl} from "@/components/ui/map";

export default function MapSearchControlWrapper() {
    const map = useMap()
    const [selectedPosition, setSelectedPosition] =
        React.useState<LatLngExpression | null>(null)

    React.useEffect(() => {
        if (!selectedPosition) return
        map.panTo(selectedPosition)
    }, [selectedPosition])

    return (
        <>
            <MapSearchControl
                onPlaceSelect={(feature) =>
                    setSelectedPosition(
                        feature.geometry.coordinates.toReversed() as LatLngExpression
                    )
                }
            />
            selectedPosition
        </>
    )
}