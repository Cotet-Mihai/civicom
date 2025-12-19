import React, { JSX } from "react";
import LogoLoop from "@/components/LogoLoop";
import { trustedONGs } from "@/data/trustedONG";
import { getLogos } from "@/utils/getLogos";

// Map the trusted organizations into the format expected by LogoLoop
const logos = getLogos(trustedONGs);

/**
 * LogoLoopContainer component renders a looping carousel of trusted organizations' logos.
 *
 * @returns {JSX.Element} The rendered logo loop section
 */
export default function LogoLoopContainer(): JSX.Element {
    return (
        <div className="bg-green-500 pt-4">
            {/* LogoLoop component displaying the mapped logos */}
            <LogoLoop
                logos={logos}
                speed={40}               // Scrolling speed of logos
                direction="left"         // Direction of scroll
                logoHeight={96}          // Height of each logo
                gap={80}                 // Gap between logos
                hoverSpeed={0}           // Speed change on hover
                scaleOnHover             // Scale logos when hovered
                fadeOut                  // Apply fade out effect
                fadeOutColor="#00c950"   // Color of fade out
                ariaLabel="ONG-uri în care avem încredere." // Accessibility label
            />
        </div>
    );
}
