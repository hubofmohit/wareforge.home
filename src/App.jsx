import { useCallback, useEffect, useState } from "react";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Tour from "./components/Tour";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ProjectModal from "./components/ProjectModal";
import Contact from "./components/Contact";
import LiveAnalysis from "./components/LiveAnalysis";
import Access from "./components/Access";
import Footer from "./components/Footer";
import Lightbox from "./components/Lightbox";
import { StatsProvider } from "./context/StatsContext";

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = useCallback((src, alt) => {
    setLightboxImage({ src, alt });
  }, []);

  // Escape closes whichever overlay is open, lightbox taking priority
  // (matches the original's keydown handler).
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== "Escape") return;
      if (lightboxImage) {
        setLightboxImage(null);
        return;
      }
      if (activeProject) setActiveProject(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxImage, activeProject]);

  return (
    <StatsProvider>
      <Background />
      <Navbar />

      <div className="scene-container">
        <Hero />
        <About />
        <Tour onOpenLightbox={openLightbox} />
        <Skills />
        <Projects onOpenProject={setActiveProject} />
        <Contact />
        <LiveAnalysis />
        <Access />
        <Footer />
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </StatsProvider>
  );
}