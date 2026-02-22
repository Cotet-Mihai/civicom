export type BasicInfoStates = {
    title: {value: string, set: (value: string) => void},
    description: {value: string, set: (value: string) => void},
    date: {value: Date | undefined, set: (value: Date | undefined) => void},
    fromTime: {value: string, set: (value: string) => void},
    toTime: {value: string, set: (value: string) => void},
    type: {value: string, set: (value: string) => void}
}