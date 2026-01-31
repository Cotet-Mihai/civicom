import {BasicInfo, CheckFieldParams, CheckTimeFieldParams} from "@/features/protest/types";

function checkField({field, name, missingFields}: CheckFieldParams) {
    if (!field) missingFields.push(name);
}

function checkTimeField({time, name, missingFields}: CheckTimeFieldParams) {
    if (!time || !time.from || !time.to) {
        missingFields.push(name);
    }
}

export default function validateBasicInfo(data: BasicInfo): true | string {
    const missingFields: string[] = [];

    checkField({
        field: data.typeProtest,
        name: 'Tipul Protestului',
        missingFields: missingFields
    });
    checkField({
        field: data.title,
        name: 'Titlul',
        missingFields: missingFields
    });
    checkField({
        field: data.description,
        name: 'Descrierea',
        missingFields: missingFields
    });
    checkField({
        field: data.date,
        name: 'Data',
        missingFields: missingFields
    });
    checkTimeField({
        time: data.time,
        name: "Ora",
        missingFields: missingFields
    });

    return missingFields.length === 0 ? true : missingFields.join(", ");
}