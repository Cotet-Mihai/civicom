import {JSX} from "react";

export type Items = {
    id: number;
    title: string;
    description: string;
    link: string;
    icon: JSX.Element;
};

export type CarouselCardContainerProps = {
    width: number;
};