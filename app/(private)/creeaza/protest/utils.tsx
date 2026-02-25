import { toast } from "sonner"

export function checkField(
    nameField: string,
    field: string | undefined | Date | number,
    missingFields: string[]
) : void {
    if (field === undefined || field === '' || field === 0) {
        missingFields.push(nameField)
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