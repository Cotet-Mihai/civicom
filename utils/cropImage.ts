// utils/cropImage.ts

/**
 * Crop and optimize an image to a fixed banner resolution (WebP).
 *
 * @param imageSrc - Source image URL (object URL or base64)
 * @param pixelCrop - Crop area in pixels
 * @param fileName - Output file name
 * @returns Optimized File (WebP)
 */
export const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number },
    fileName: string = "banner-optimized.webp"
): Promise<File> => {
    const OUTPUT_WIDTH = 2100;
    const OUTPUT_HEIGHT = 900;
    const QUALITY = 0.8;

    const image = new Image();
    image.src = imageSrc;

    await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = reject;
    });

    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT_WIDTH;
    canvas.height = OUTPUT_HEIGHT;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Failed to initialize canvas context");
    }

    /**
     * Draw cropped area scaled to fixed banner resolution
     */
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        OUTPUT_WIDTH,
        OUTPUT_HEIGHT
    );

    /**
     * Convert canvas to WebP blob
     */
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error("Canvas is empty"));
                    return;
                }

                const file = new File([blob], fileName, {
                    type: "image/webp",
                });

                resolve(file);
            },
            "image/webp",
            QUALITY
        );
    });
};

// utils/cropImage.ts (Adaugă la finalul fișierului existent)

/**
 * Optimizează o imagine: format WebP, compresie și o limită maximă de rezoluție
 * fără a schimba raportul de aspect (fără crop).
 */
export const optimizeGalleryImage = async (
    file: File,
    maxDimension: number = 2500, // Limită de siguranță pentru lățime/înălțime
    quality: number = 0.8
): Promise<File> => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);
    image.src = objectUrl;

    await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = reject;
    });

    let width = image.naturalWidth;
    let height = image.naturalHeight;

    // Redimensionăm proporțional doar dacă imaginea depășește limita de siguranță
    if (width > maxDimension || height > maxDimension) {
        if (width > height) {
            height = (maxDimension / width) * height;
            width = maxDimension;
        } else {
            width = (maxDimension / height) * width;
            height = maxDimension;
        }
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Failed to initialize canvas context");

    ctx.drawImage(image, 0, 0, width, height);

    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                URL.revokeObjectURL(objectUrl); // Curățăm memoria
                if (!blob) {
                    reject(new Error("Canvas is empty"));
                    return;
                }
                const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
                const optimizedFile = new File([blob], newFileName, {
                    type: "image/webp",
                });
                resolve(optimizedFile);
            },
            "image/webp",
            quality
        );
    });
};