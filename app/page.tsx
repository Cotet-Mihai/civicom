import HeroSection from "@/app/components/HeroSection";
import BannerTrusted from "@/app/components/BannerTrusted";
import QaSection from "@/app/components/QaSection";
import LogoLoopContainer from "@/app/containers/LogoLoopContainer";
import {JSX} from "react";

/**
 * Home page component.
 * Combines multiple sections to create the main landing page layout:
 * Hero section, trusted organizations banner, QA section, and logo loop.
 *
 * @returns {JSX.Element} The rendered home page
 */
export default function Home(): JSX.Element {
    return (
        <div>
            {/* Hero section with headline and search */}
            <HeroSection/>

            {/* Main content container */}
            <div className={'md:h-screen bg-white flex flex-col pt-12'}>
                {/* Banner highlighting trusted organizations */}
                <BannerTrusted/>

                {/* QA section explaining trust in organizations */}
                <QaSection/>

                {/* Logo loop container for displaying trusted organizations */}
                <LogoLoopContainer/>
            </div>
        </div>
    );
}
