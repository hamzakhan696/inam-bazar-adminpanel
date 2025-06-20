import CardSection from "./CardSection";
import HeroSection from "./HeroSection";
import MillionDollerSection from "./MillionDollerSection";

export default function LandingPage() {
  return (
    <div style={{padding: 0}}>
      <HeroSection />
      <CardSection />
      <MillionDollerSection />
    </div>
  );
}
