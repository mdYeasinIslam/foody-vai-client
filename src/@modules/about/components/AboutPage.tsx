import BaseComponentHeroBanner from "@/src/@base/components/BaseComponentHeroBanner";
import React from "react";
import MissionSection from "./MissionSection";
import WhyChooseSection from "./WhyChooseSection";
import ValuesSection from "./ValuesSection";
import CtaSection from "./CtaSection";

interface IProps {
  className?: string;
}

const AboutPage: React.FC<IProps> = ({ className = "" }) => {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
    
      <BaseComponentHeroBanner
        title="About Us"
        bannerImg="/images/terms-condition/term-banner.webp"
      />
      <MissionSection />
      <WhyChooseSection />
      <ValuesSection />
      <CtaSection />
    </div>
  );
};

export default AboutPage;
