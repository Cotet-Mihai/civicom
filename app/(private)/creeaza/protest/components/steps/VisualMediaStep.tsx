'use client'

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { X } from "lucide-react";
import { VisualMediaStepProps } from "@/app/(private)/creeaza/protest/types";
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadItem,
    FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadList,
    FileUploadTrigger,
} from "@/components/ui/file-upload";
import { ImagePlus } from "lucide-react";

export default function VisualMediaStep({ dataStates }: VisualMediaStepProps) {
    const [bannerFiles, setBannerFiles] = React.useState<File[]>([]);

    const bannerPreview = bannerFiles.length > 0 ? URL.createObjectURL(bannerFiles[0]) : null;

    React.useEffect(() => {
        if (bannerFiles.length > 0) {
            dataStates.banner.set(bannerFiles[0]);
        } else {
            dataStates.banner.set(null);
        }
    }, [bannerFiles, dataStates.banner]);

    const removeBanner = () => setBannerFiles([]);

    return (
        <div className="flex flex-col gap-6 w-full">

            {/* BANNER */}
            <Card>
                <CardHeader>
                    <CardTitle>Imagine banner</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">

                    <FileUpload
                        value={bannerFiles}
                        onValueChange={setBannerFiles}
                        accept="image/*"
                        maxFiles={1}
                        maxSize={5 * 1024 * 1024}
                    >
                        <FileUploadTrigger asChild>
                            <div className="group relative cursor-pointer overflow-hidden rounded-lg border-2 border-dashed">
                                {bannerPreview ? (
                                    <div className="relative aspect-[3/1]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={bannerPreview}
                                            alt="Cover"
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                            <span className="text-sm font-medium text-white">Click to change</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex aspect-[3/1] flex-col items-center justify-center gap-2 bg-muted/50 transition-colors group-hover:bg-muted">
                                        <ImagePlus className="size-8 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">Adaugă imagine banner</span>
                                    </div>
                                )}
                            </div>
                        </FileUploadTrigger>
                    </FileUpload>

                    {bannerPreview && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-destructive"
                            onClick={removeBanner}
                        >
                            <X className="mr-1 size-4" /> Remove banner
                        </Button>
                    )}
                </CardContent>
            </Card>

            {/* GALERIE */}
            <Card>
                <CardHeader>
                    <CardTitle>Pancarde pentru protest</CardTitle>
                    <CardDescription>Adăugați aici pancartele pe care doriți ca participanții să le aducă la protest</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">

                    <FileUpload
                        value={dataStates.gallery.value}
                        onValueChange={dataStates.gallery.set}
                        multiple
                        maxFiles={20}
                        maxSize={5 * 1024 * 1024}
                        className="w-full"
                    >
                        <div className="w-50 mx-auto">
                            <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center p-6">
                                <ImagePlus className="size-4 mx-auto mb-2" />
                                <span className="text-sm mx-1">Trage imaginile aici sau</span>
                                <FileUploadTrigger asChild>
                                    <Button variant="link" size="sm" className="h-auto p-0">selectează fișiere</Button>
                                </FileUploadTrigger>
                            </FileUploadDropzone>
                        </div>

                        <FileUploadList>
                            {dataStates.gallery.value.map((file, index) => (
                                <FileUploadItem key={index} value={file}>
                                    <FileUploadItemPreview />
                                    <FileUploadItemMetadata />
                                    <FileUploadItemDelete asChild>
                                        <Button variant="ghost" size="icon" className="size-7">
                                            <X className="size-4" />
                                        </Button>
                                    </FileUploadItemDelete>
                                </FileUploadItem>
                            ))}
                        </FileUploadList>
                    </FileUpload>

                </CardContent>
            </Card>
        </div>
    )
}