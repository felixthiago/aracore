// pages
import Navbar from "@/components/pages/navbar";
import { HeroSection } from "@/components/pages/hero-section";
import PricingSection from "@/components/pages/pricing";
import AboutSection from "@/components/pages/about";
import FAQSection from "@/components/pages/faq";
import Footer from "@/components/pages/footer";

// particles
// import Particles, { ParticleLoader } from "@/components/animations/particles";
// import { Suspense } from "react";

export default function Home(){
  return (
    <div className="relative min-h-screen bg-black">
      {/* <Suspense fallback={<ParticleLoader />}>
        <Particles />
      </Suspense>
     */}
      <div className="relative z-10"> 
        <div className="navbar-container"><Navbar /> </div>
        <div id = "hero"><HeroSection /></div>
        <div id = "about"><AboutSection /></div>
        <div id = "pricing"><PricingSection /></div>
        <div id = "faq"><FAQSection /></div>
        <div className="footer"><Footer /></div>
      </div>
    </div>
  )
}