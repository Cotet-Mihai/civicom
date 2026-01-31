import {Boycott, MapsProps} from "@/features/protest/types";


export default function BoycottMap({dataState, defaultLocation}: MapsProps<Boycott>) {
    const {value: data, set: onChange} = dataState;

    return (
        <h1>
            BOYCOT
        </h1>
    );
}