'use client';

import dynamic from "next/dynamic";

const picketMap = dynamic(
    () => import("./picketMap"),
    { ssr: false }
);

export default picketMap;
