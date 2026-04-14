'use client'

import { useState } from "react";
import VisualMediaStep from "@/app/(private)/creeaza/protest/components/steps/VisualMediaStep";
import { showErrorToast } from "@/app/(private)/creeaza/protest/utils";
import {DataMedia, UseVisualMediaReturn} from "@/app/(private)/creeaza/protest/types";

export default function useVisualMedia(): UseVisualMediaReturn {

    const [banner, setBanner] = useState<File>();
    const [gallery, setGallery] = useState<File[]>([]);

    function validateData(): boolean {

        if (!banner) {
            showErrorToast(["Imaginea banner este obligatorie"]);
            return false;
        }

        return true;
    }

    function getData(): DataMedia {
        return {
            banner: banner,
            gallery: gallery
        }
    }

    return {
        states: {
            banner: { value: banner, set: setBanner },
            gallery: { value: gallery, set: setGallery }
        },
        data: getData(),
        validator: validateData,
        component: VisualMediaStep
    }
}