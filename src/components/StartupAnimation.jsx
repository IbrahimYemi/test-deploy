import { useState, useEffect } from "react";
import HeroSection from "./HeroSection";

const StartupAnimation = () => {
  const [showHeroSection, setShowHeroSection] = useState(false);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setShowHeroSection(true);
    }, 2000);

    return () => clearTimeout(animationTimeout);
  }, []);

  return (
    <div className="startup-animation-container">
      {showHeroSection ? (
        <HeroSection />
      ) : (
        <div className="startup-animation">
          <h1 className="startup-text">The <br /> Opeyemi&apos;s Affairs</h1>
        </div>
      )}
    </div>
  );
};

export default StartupAnimation;
