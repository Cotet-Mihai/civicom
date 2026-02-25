'use client';

import dynamic from "next/dynamic";

// Client-only dynamic maps (Leaflet safe)

export const GatheringStep = dynamic(
    () => import("./GatheringStep"),
    { ssr: false }
);

// export const MarchMap = dynamic(
//     () => import("./marchMap"),
//     { ssr: false }
// );
//
// export const PicketMap = dynamic(
//     () => import("./picketMap"),
//     { ssr: false }
// );