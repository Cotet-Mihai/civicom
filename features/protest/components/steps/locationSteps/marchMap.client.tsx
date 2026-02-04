'use client';

import dynamic from "next/dynamic";

const marchMap = dynamic(
    () => import("./marchMap"),
    { ssr: false }
);

export default marchMap;
