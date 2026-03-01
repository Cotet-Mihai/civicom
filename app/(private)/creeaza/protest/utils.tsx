import { toast } from "sonner"
import type L from 'leaflet'
import {type Brand} from "@/app/(private)/creeaza/protest/types";

export function checkField(
    nameField: string,
    field: string | undefined | Date | number | L.Marker | L.Polyline | L.Marker[] | L.Polyline[] | Brand[],
    missingFields: string[]
): void {

    if (field === undefined) {
        missingFields.push(nameField);
        return;
    }

    if (typeof field === 'string' && field.trim() === '') {
        missingFields.push(nameField);
        return;
    }

    if (typeof field === 'number' && field === 0) {
        missingFields.push(nameField);
        return;
    }

    if (Array.isArray(field) && field.length === 0) {
        missingFields.push(nameField);
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