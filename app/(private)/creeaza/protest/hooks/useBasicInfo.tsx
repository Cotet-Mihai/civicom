import {JSX, useEffect, useState} from "react";
import {BasicInfoStates} from "@/app/(private)/creeaza/protest/types";
import {toast} from "sonner";
import BasicInfoStep, {BasicInfoStepProps} from "@/app/(private)/creeaza/protest/components/steps/BasicInfoStep";



export type UseBasicInfoReturn = {
    states: BasicInfoStates,
    validator: () => boolean,
    component: ({dataStates}: BasicInfoStepProps) => JSX.Element
}

export default function useBasicInfo(): UseBasicInfoReturn {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [fromTime, setFromTime] = useState<string>('');
    const [toTime, setToTime] = useState<string>('');
    const [type, setType] = useState<string>('');

    // For testing
    // useEffect(() => {
    //     console.log("Title:", title);
    //     console.log("Description:", description);
    //     console.log("Date:", date);
    //     console.log("From time:", fromTime);
    //     console.log("To time:", toTime);
    //     console.log("Type:", type);
    // }, [title, description, date, fromTime, toTime, type]);

    function checkField(
        nameField: string,
        field: string | undefined | Date,
        missingFields: string[]
    ) : void {
        if (field === undefined || field === '') {
            missingFields.push(nameField)
        }
    }

    function showErrorToast(missingFields: string[]): void {
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

    function validateData(): boolean {
        const missingFields: string[] = [];

        checkField('Tipul protestului', type, missingFields)
        checkField('Titlu', title, missingFields)
        checkField('Descriere', description, missingFields)
        checkField('Data', date, missingFields)
        checkField('Când începe protestul', fromTime, missingFields)
        checkField('Până când ține protestul', toTime, missingFields)

        if (missingFields.length > 0) {
            showErrorToast(missingFields);
            return false;
        }
        return true;
    }

    return {
        states: {
            title: {value: title, set: setTitle},
            description: {value: description, set: setDescription},
            date: {value: date, set: setDate},
            fromTime: {value: fromTime, set: setFromTime},
            toTime: {value: toTime, set: setToTime},
            type: {value: type, set: setType}
        },
        validator: validateData,
        component: BasicInfoStep
    }
}