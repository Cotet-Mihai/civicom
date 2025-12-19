import HeroSection from "@/components/HeroSection";
import BannersTrustedONG from "@/components/BannersTrustedONG";
import QaSection from "@/components/QaSection";
import LogoLoopContainer from "@/components/containers/home/LogoLoopContainer";

export default function Home() {
  return (
    <div>
        {/* Hero section with headline and search */}
        <HeroSection/>

        <div className={'md:h-screen bg-white flex flex-col pt-12'}>
            {/* Banner highlighting trusted organizations */}
            <BannersTrustedONG/>

            {/* QA section explaining trust in organizations */}
            <QaSection/>

            {/* Logo loop container for displaying trusted organizations */}
            <LogoLoopContainer/>
        </div>
    </div>
  );
}
