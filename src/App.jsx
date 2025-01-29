import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import NavBar from "./components/NavBar";
import FeaturesSection from "./components/FeaturesSection";

export default function App() {
  return <main className="relative min-h-dvh min-w-dvw">
    <NavBar />
    <HeroSection />
    <AboutSection />
    <FeaturesSection />
  </main>
}

