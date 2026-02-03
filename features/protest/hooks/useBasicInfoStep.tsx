import {useState} from "react";

import BasicInfoStep from "@/features/protest/components/steps/BasicInfoStep";

import {checkField, checkTimeField} from '@/features/protest/utils';

import {BasicInfo, UseBasicInfoResult} from "@/features/protest/types/basicInfoTypes";
import {toast} from "sonner";

export default function useBasicInfoStep(): UseBasicInfoResult {

    const [basicInfo, setBasicInfo] = useState<BasicInfo>({
        title: undefined,
        description: undefined,
        date: undefined,
        time: {
            to: "10:30",
            from: "12:30"
        },
        typeProtest: undefined
    });

    function reset(): void {
        setBasicInfo({
            title: undefined,
            description: undefined,
            date: undefined,
            time: {
                to: "10:30",
                from: "12:30"
            },
            typeProtest: undefined
        })
    }

    function validator(): boolean {
        const missingFields: string[] = [];

        checkField({ field: basicInfo.typeProtest, name: 'Tipul Protestului', missingFields });
        checkField({ field: basicInfo.title, name: 'Titlu', missingFields });
        checkField({ field: basicInfo.description, name: 'Descrierea', missingFields });
        checkField({ field: basicInfo.date, name: 'Data', missingFields });
        checkTimeField({ time: basicInfo.time, missingFields });

        if (missingFields.length > 0) {
            (toast.error(
                <span>
                    <span className={'font-bold'}>Câmpuri lipsă:</span>
                    <ol>
                        {missingFields.map((field, index) => (
                            <li key={index}>• {field}</li>
                        ))}
                    </ol>
                </span>
            ));
            return false
        }
        return true;
    }

    return {
        state: {
            value: basicInfo,
            set: setBasicInfo
        },
        component: BasicInfoStep,
        validator: validator,
        controls: {
            reset: reset
        }
    }
}