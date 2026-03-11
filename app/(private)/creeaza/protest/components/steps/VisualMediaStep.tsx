'use client'

import { useRef, ChangeEvent } from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, X } from "lucide-react";
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

export default function VisualMediaStep({ dataStates }: VisualMediaStepProps) {

    const bannerInputRef = useRef<HTMLInputElement | null>(null);

    function bannerInput(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        dataStates.banner.set(file);
    }

    function removeBanner() {
        dataStates.banner.set(null);
    }

    return (
        <div className="flex flex-col gap-6 w-full">

            {/* BANNER */}
            <Card>
                <CardHeader>
                    <CardTitle>Imagine banner</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                    {!dataStates.banner.value && (
                        <div
                            onDrop={(e) => {
                                e.preventDefault();
                                const file = e.dataTransfer.files?.[0];
                                if (file) dataStates.banner.set(file);
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:bg-muted transition"
                        >

                            <UploadCloud className="mx-auto mb-4 h-10 w-10 opacity-70" />

                            <p className="font-medium">Trage imaginea banner aici</p>
                            <p className="text-sm text-muted-foreground mb-4">sau selectează manual</p>

                            <Button
                                variant="secondary"
                                onClick={() => bannerInputRef.current?.click()}
                            >
                                Selectează imagine
                            </Button>

                            <input
                                ref={bannerInputRef}
                                type="file"
                                accept="image/*"
                                onChange={bannerInput}
                                className="hidden"
                            />
                        </div>
                    )}

                    {dataStates.banner.value && (
                        <div className="relative rounded-lg overflow-hidden border">
                            <img
                                src={URL.createObjectURL(dataStates.banner.value)}
                                alt="Preview banner protest"
                                className="w-full h-64 object-cover"
                            />
                            <Button
                                size="icon"
                                variant="destructive"
                                className="absolute top-2 right-2"
                                onClick={removeBanner}
                            >
                                <X size={16} />
                            </Button>
                        </div>
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
                        maxFiles={20}   // poți ajusta după nevoie
                        maxSize={5 * 1024 * 1024}
                        className="w-full"
                    >
                        <div className={'w-50 mx-auto'}>
                            <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center p-6">
                                <UploadCloud className="size-4 mx-auto mb-2" />
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
    )
}