export type ProtestType = '' | 'gathering' | 'march' | 'picket' | 'boycott'

export type BasicInfoStates = {
    title: {value: string, set: (value: string) => void},
    description: {value: string, set: (value: string) => void},
    date: {value: Date | undefined, set: (value: Date | undefined) => void},
    fromTime: {value: string, set: (value: string) => void},
    toTime: {value: string, set: (value: string) => void},
    type: {value: ProtestType, set: (value: ProtestType) => void}
}

export type GateringStates = {
    lat: {value: number, set: (value: number)=> void},
    lng: {value: number, set: (value: number)=> void},
}