'use client';

import dynamic from "next/dynamic";

// Client-only dynamic maps (Leaflet safe)

export const DefaultLocationStep = dynamic(
    () => import("./DefaultLocationStep"),
    { ssr: false }
);

export const MarchMap = dynamic(
    () => import("./MarchStep"),
    { ssr: false }
);
//
// export const PicketMap = dynamic(
//     () => import("./picketMap"),
//     { ssr: false }
// );