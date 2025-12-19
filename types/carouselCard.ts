import {JSX} from "react";

export type CarouselItems = {
    id: number;
    title: string;
    description: string;
    link: string;
    icon: JSX.Element;
};

export type CarouselCardContainerProps = {
    width: number;
};