import { TrustedONG } from "@/types/ong";
import { LogosProps } from "@/types/logoLoop";

/**
 * Converts an array of TrustedOng objects into LogosProps array for LogoLoop.
 *
 * @param ongs - Array of trusted organizations
 * @returns Array of LogosProps for LogoLoop
 */
export const getLogos = (ongs: TrustedONG[]): LogosProps[] =>
    ongs.map(ong => ({ src: ong.image, alt: ong.name, href: ong.link }));
