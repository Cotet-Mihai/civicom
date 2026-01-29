import {CheckField, CheckTimeField, FormDataBasicInfo} from "@/types/protestStepper";

function checkField({field, name, missingFields}: CheckField) {
    if (!field) missingFields.push(name);
}

function checkTimeField({time, missingFields}: CheckTimeField) {
    if (!time || !time.from || !time.to) {
        missingFields.push("Ora");
    }
}

export default function validateBasicInfo(data: FormDataBasicInfo): true | string {
    const missingFields: string[] = [];

    checkField({
        field: data.typeProtest,
        name: 'Tipul Protestului',
        missingFields: missingFields
    });
    checkField({
        field: data.title,
        name: 'Titlu',
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
        missingFields: missingFields
    });

    return missingFields.length === 0 ? true : missingFields.join(", ");
}