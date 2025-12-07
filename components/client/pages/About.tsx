import AboutHero from "../sections/AboutHero";
import AboutMission from "../sections/AboutMissions";
import AboutValues from "../sections/AboutValues";
import AboutCTA from "../sections/AboutCTA";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-[#261C1A]">
      <AboutHero />

      <AboutMission />

      <AboutValues />

      <AboutCTA />
    </div>
  );
};

export default AboutPage;
