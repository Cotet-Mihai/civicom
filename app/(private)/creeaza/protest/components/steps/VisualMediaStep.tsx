'use client'

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { X, ImagePlus } from "lucide-react";
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
import { BannerUpload } from "@/app/(private)/creeaza/protest/components/BannerUpload";
import {optimizeGalleryImage} from "@/utils/cropImage";

export default function VisualMediaStep({ dataStates }: VisualMediaStepProps) {

    const handleBannerReady = (optimizedFile: File) => {
        // We save the final file directly to the global state of the form
        dataStates.banner.set(optimizedFile);
    };

    const handleGalleryChange = async (files: File[]) => {
        // We detect if there are new files that are not yet WebP (or optimized)
        const optimizedFiles = await Promise.all(
            files.map(async (file) => {
                // If the file is already WebP and comes from our state, we don't process it anymore
                // (We avoid re-processing every time the list changes)
                if (file.type === "image/webp" && file.name.includes("optimized")) {
                    return file;
                }

                try {
                    return await optimizeGalleryImage(file);
                } catch (err) {
                    console.error("Eroare la optimizarea imaginii din galerie", err);
                    return file; // Fallback to the original file in case of error
                }
            })
        );

        dataStates.gallery.set(optimizedFiles);
    };

    return (
        <div className="flex flex-col gap-6 w-full">

            {/*BANNER*/}
            <Card>
                <CardHeader>
                    <CardTitle>Imagine banner</CardTitle>
                    <CardDescription>
                        Această imagine va apărea în partea de sus a paginii protestului.
                        Poți reîncadra imaginea după încărcare.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BannerUpload
                        onImageReady={handleBannerReady}
                        className="h-64 md:h-72"
                    />

                    {dataStates.banner.value && (
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full" />
                            Imagine optimizată și pregătită pentru salvare.
                        </p>
                    )}
                </CardContent>
            </Card>

            {/*GALERY*/}
            <Card>
                <CardHeader>
                    <CardTitle>Pancarde pentru protest</CardTitle>
                    <CardDescription>
                        Adăugați aici pancartele pe care doriți ca participanții să le aducă la protest. Imaginile vor fi optimizate automat.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">

                    <FileUpload
                        value={dataStates.gallery.value}
                        onValueChange={handleGalleryChange}
                        multiple
                        maxFiles={20}
                        maxSize={10 * 1024 * 1024} // We increase the upload limit, because optimization occurs after
                        className="w-full"
                    >
                        <div className="w-50 mx-auto">
                            <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center p-6">
                                <ImagePlus className="size-4 mx-auto mb-2" />
                                <span className="text-sm mx-1">Trage imaginile aici sau</span>
                                <FileUploadTrigger asChild>
                                    <Button variant="link" size="sm" className="h-auto p-0">
                                        selectează fișiere
                                    </Button>
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
    );
}