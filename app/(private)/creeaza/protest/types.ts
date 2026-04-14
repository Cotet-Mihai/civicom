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

export type DataBasicInfo = {
    title: string,
    description: string,
    date: string | undefined,
    fromTime: string,
    toTime: string,
    type: string
};

export type BasicInfoStepProps = {
    dataStates: BasicInfoStates
}

export type UseBasicInfoReturn = {
    states: BasicInfoStates,
    validator: () => boolean,
    component: ({dataStates}: BasicInfoStepProps) => JSX.Element,
    data: DataBasicInfo
}

export type DataDefaultLocation = {
    lat: number | undefined,
    lng: number | undefined
}

export type DefaultLocationStates = {
    marker: {value: L.Marker | undefined, set: Dispatch<SetStateAction<L.Marker | undefined>> }
}

export type UseDefaultLocationStepReturn = {
    states: DefaultLocationStates,
    data: DataDefaultLocation,
    validator: () => boolean,
    component: React.ComponentType<DefaultLocationStepProps>,
}

export type DefaultLocationStepProps = {
    dataStates: DefaultLocationStates
}

export type DataMarchLocation = {
    polylines: number[][]
}

export type MarchStates = {
    polyline: {value: L.Polyline | undefined, set: Dispatch<SetStateAction<L.Polyline | undefined>> }
}

export type MarchStepProps = {
    dataStates: MarchStates
}

export type UseMarchStepReturn = {
    states: MarchStates,
    data: DataMarchLocation,
    validator: () => boolean,
    component: React.ComponentType<MarchStepProps>,
}

export type DataBoycott = {
    reason: string
    method: string
    brands: Brand[]
};


export type BoycottStates = {
    reason: { value: string, set: Dispatch<SetStateAction<string>>}
    method: { value: string, set: Dispatch<SetStateAction<string>>}
    brands: { value: Brand[], set: Dispatch<SetStateAction<Brand[]>>}
}

export type BoycottStepProps = {
    dataStates: BoycottStates
}

export type UseBoycottStepReturn = {
    states: BoycottStates,
    data: DataBoycott,
    validator: () => boolean,
    component: React.ComponentType<BoycottStepProps>,
}


export type Alternative = {
    name: string
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

export interface DataMedia {
    banner?: File,
    gallery: File[]
}

export interface VisualMediaStates {
    banner: {
        value?: File
        set: (value: File) => void
    }
    gallery: {
        value: File[]
        set: (value: File[]) => void
    }
}

export interface VisualMediaStepProps {
    dataStates: VisualMediaStates
}

export interface UseVisualMediaReturn {
    states: VisualMediaStates
    data: DataMedia
    validator: () => boolean
    component: React.ComponentType<VisualMediaStepProps>
}


export interface Contact {
    firstName: string;
    lastName: string;
    mail: string;
}

export interface DataLogistics {
    participants: number
    isLimited: boolean
    equipment: string[]
    safetyRules: string
    contacts: Contact[]
}

export interface LogisticsStepStates {
    participants: { value: number | null; set: (value: number) => void };
    isLimited: { value: boolean; set: (value: boolean) => void };
    equipment: { value: string[]; set: (value: string[]) => void };
    safetyRules: { value: string; set: (value: string) => void };
    contacts: { value: Contact[]; set: (value: Contact[]) => void };
}

export interface LogisticsStepProps {
    dataStates: LogisticsStepStates;
}

export interface UseLogisticsStepReturn {
    states: LogisticsStepStates;
    data: DataLogistics;
    validator: () => boolean;
    component: React.ComponentType<LogisticsStepProps>;
}