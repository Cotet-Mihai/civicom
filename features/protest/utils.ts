import {CheckField, CheckTimeField, LocationFiled, MultiLocationFiled} from "@/features/protest/types/validators";

export function checkField({field, name, missingFields}: CheckField) {
    if (!field) missingFields.push(name);
}

export function checkTimeField({time, missingFields}: CheckTimeField) {
    if (!time || !time.from || !time.to) {
        missingFields.push("Ora");
    }
}

export function checkLocation({location, name, missingFields}: LocationFiled) {
    if (!location || !location.lat || !location.lng) {
        missingFields.push(name);
    }
}

export function checkMultiLocation({locations, name, missingFields}: MultiLocationFiled) {
    if (locations.length === 0) {
        missingFields.push(name);
    }
}