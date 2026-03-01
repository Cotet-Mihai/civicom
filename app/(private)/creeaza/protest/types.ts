import React, {Dispatch, JSX, SetStateAction} from "react";
import type L from 'leaflet';


export type ProtestType = '' | 'gathering' | 'march' | 'picket' | 'boycott'

export type BasicInfoStates = {
    title: {value: string, set: Dispatch<SetStateAction<string>>},
    description: {value: string, set: Dispatch<SetStateAction<string>>},
    date: {value: Date | undefined, set: Dispatch<SetStateAction<Date | undefined>>},
    fromTime: {value: string, set: Dispatch<SetStateAction<string>>},
    toTime: {value: string, set: Dispatch<SetStateAction<string>>},
    type: {value: ProtestType, set: Dispatch<SetStateAction<ProtestType>>}
}

export type BasicInfoStepProps = {
    dataStates: BasicInfoStates
}

export type UseBasicInfoReturn = {
    states: BasicInfoStates,
    validator: () => boolean,
    component: ({dataStates}: BasicInfoStepProps) => JSX.Element
}

export type DefaultLocationStates = {
    marker: {value: L.Marker | undefined, set: Dispatch<SetStateAction<L.Marker | undefined>> }
}

export type UseDefaultLocationStepReturn = {
    states: DefaultLocationStates,
    validator: () => boolean,
    component: React.ComponentType<DefaultLocationStepProps>,
}

export type DefaultLocationStepProps = {
    dataStates: DefaultLocationStates
}

export type MarchStates = {
    polyline: {value: L.Polyline | undefined, set: Dispatch<SetStateAction<L.Polyline | undefined>> }
}

export type MarchStepProps = {
    dataStates: MarchStates
}

export type UseMarchStepReturn = {
    states: MarchStates,
    validator: () => boolean,
    component: React.ComponentType<MarchStepProps>,
}


export type BoycottStates = {
    reason: { value: string, set: Dispatch<SetStateAction<string>>}
    operation: { value: string, set: Dispatch<SetStateAction<string>>}
    brands: { value: Brand[], set: Dispatch<SetStateAction<Brand[]>>}
}

export type BoycottStepProps = {
    dataStates: BoycottStates
}

export type UseBoycottStepReturn = {
    states: BoycottStates,
    validator: () => boolean,
    component: React.ComponentType<BoycottStepProps>,
}


export type Alternative = {
    title: string
    link: string
    reason: string
}

export type Brand = {
    name: string
    link: string
    alternatives: Alternative[]
}

export type BrandDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (brand: Brand) => void
    initialData?: Brand | null
}