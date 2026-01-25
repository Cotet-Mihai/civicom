import {FormDataBasicInfo} from "@/types/protestStepper";

export function validateBasicInfo(data: FormDataBasicInfo) {
    const {title, description, date, time, typeProtest} = data;
    return !!title && !!description && !!date && !!time && !!typeProtest;
}