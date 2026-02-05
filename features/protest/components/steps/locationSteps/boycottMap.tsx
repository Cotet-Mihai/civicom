import {StandardStepProp} from "@/features/protest/types/type";
import {Boycott} from "@/features/protest/types/locationTypes";


export default function BoycottMap({dataState}: StandardStepProp<Boycott>) {
    const {value: data, set: onChange} = dataState;

    return (
        <h1>
            BOYCOT
        </h1>
    );
}