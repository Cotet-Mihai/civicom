import HeroSection from "@/app/components/HeroSection";
import BannerTrusted from "@/app/components/BannerTrusted";
import QaSection from "@/app/components/QaSection";
import LogoLoopContainer from "@/app/containers/LogoLoopContainer";

export default function Home() {
    return (
        <div>
            <HeroSection/>
            <div className={'md:h-screen bg-white flex flex-col pt-12'}>
                <BannerTrusted/>
                <QaSection/>
                <LogoLoopContainer/>
            </div>
        </div>

    );
}