import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import NavBar from "./components/NavBar";
import FeaturesSection from "./components/FeaturesSection";
import StorySection from "./components/StorySection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
	return (
		<main className="relative min-h-dvh min-w-dvw">
			<NavBar />
			<HeroSection />
			<AboutSection />
			<FeaturesSection />
			<StorySection />
			<ContactSection />
			<Footer />
		</main>
	);
}
