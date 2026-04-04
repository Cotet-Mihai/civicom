"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { UploadCloud, Image as ImageIcon, Check, RefreshCw } from "lucide-react";
import { getCroppedImg } from "@/utils/cropImage"; // Ajustează calea după nevoie

interface BannerUploadProps {
    onImageReady: (file: File) => void;
    className?: string;
}

export function BannerUpload({ onImageReady, className }: BannerUploadProps) {
    // Stări pentru fluxul de lucru
    const [imageSrc, setImageSrc] = useState<string | null>(null); // Imaginea brută încărcată
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Imaginea finală procesată

    // Stări pentru decupare (cropping)
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Funcție apelată când utilizatorul aruncă/selectează un fișier
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const objectUrl = URL.createObjectURL(file);
            setImageSrc(objectUrl);
            setPreviewUrl(null); // Resetăm preview-ul dacă exista o imagine veche
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        maxFiles: 1,
        noClick: !!imageSrc || !!previewUrl, // Dezactivăm click-ul nativ când edităm sau avem preview
    });

    const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // Funcție de finalizare a repoziționării
    const handleApplyCrop = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        try {
            setIsProcessing(true);
            // Procesăm și comprimăm imaginea -> WebP
            const optimizedFile = await getCroppedImg(imageSrc, croppedAreaPixels);

            // Creăm un URL local pentru a afișa rezultatul optimizat
            setPreviewUrl(URL.createObjectURL(optimizedFile));
            setImageSrc(null); // Ieșim din modul editare

            // Trimitem fișierul către componenta părinte (pregătit pentru Supabase)
            onImageReady(optimizedFile);
        } catch (e) {
            console.error("Eroare la procesarea imaginii:", e);
        } finally {
            setIsProcessing(false);
        }
    };

    // Funcție pentru resetare (când dăm click pe butonul de la hover)
    const handleReplace = (e: React.MouseEvent) => {
        e.stopPropagation();
        open(); // Deschide direct fereastra de selecție fișiere
    };

    return (
        <div
            {...getRootProps()}
            className={`relative w-full h-64 overflow-hidden rounded-xl border-2 transition-colors duration-200 group flex items-center justify-center bg-muted/50 ${
                isDragActive ? "border-primary bg-primary/5" : "border-dashed border-muted-foreground/30"
            } ${className || ""}`}
        >
            <input {...getInputProps()} />

            {/* STAREA 1: Goală (Așteaptă Drag & Drop / Click) */}
            {!imageSrc && !previewUrl && (
                <div className="flex flex-col items-center justify-center text-muted-foreground cursor-pointer p-6 text-center w-full h-full">
                    <UploadCloud className="w-10 h-10 mb-4 text-muted-foreground/60" />
                    <p className="text-sm font-medium">Click sau drag & drop</p>
                    <p className="text-xs mt-1 text-muted-foreground/70">pentru a încărca o imagine de banner</p>
                </div>
            )}

            {/* STAREA 2: Editare (Afișează imaginea și permite mutarea) */}
            {imageSrc && !previewUrl && (
                <div className="absolute inset-0 z-10 w-full h-full">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={21 / 9} // Raport fix tip banner (poți ajusta, ex: 16/9, 3/1)
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        objectFit="horizontal-cover"
                    />
                    {/* Instrucțiuni și Buton Salvare */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
            <span className="text-xs text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
              Trage pentru a repoziționa imaginea
            </span>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleApplyCrop(); }}
                            disabled={isProcessing}
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-sm font-medium rounded-md shadow-lg transition-all focus:outline-none"
                        >
                            {isProcessing ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                                <Check className="w-4 h-4" />
                            )}
                            {isProcessing ? "Se procesează..." : "Aplică încadrarea"}
                        </button>
                    </div>
                </div>
            )}

            {/* STAREA 3: Previzualizare finală optimizată + Hover Overlay */}
            {previewUrl && (
                <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={previewUrl}
                        alt="Banner selectat"
                        className="object-cover w-full h-full"
                    />
                    {/* Overlay la Hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <button
                            onClick={handleReplace}
                            className="inline-flex items-center gap-2 bg-background text-foreground hover:bg-muted px-4 py-2 text-sm font-medium rounded-md shadow-md transition-all focus:outline-none"
                        >
                            <ImageIcon className="w-4 h-4" />
                            Schimbă imaginea
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}