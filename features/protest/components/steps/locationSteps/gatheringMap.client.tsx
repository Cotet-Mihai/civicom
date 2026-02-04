'use client';

import dynamic from "next/dynamic";

const gatheringMap = dynamic(
    () => import("./gatheringMap"),
    { ssr: false }
);

export default gatheringMap;
