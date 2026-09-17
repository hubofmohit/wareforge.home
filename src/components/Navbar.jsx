import { useEffect, useState } from "react";
import { navLinks } from "../data/content";
import { useScrollSpy } from "../hooks/useScrollSpy";

const sectionIds = navLinks.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.pageYOffset > 40);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape, mirroring the original's global
  // Escape handler (the modal/lightbox handle their own Escape in App.jsx).
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function handleLinkClick(e, id) {
    e.preventDefault();
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
        <span className="access-corner tl" />
        <span className="access-corner tr" />
        <span className="access-corner bl" />
        <span className="access-corner br" />

        <div className="nav-brand">
          <span className="access-live-dot" />
          WARE<span className="accent">|</span>FORGE
        </div>

        <div className={`nav-links${mobileOpen ? " active" : ""}`} id="navLinks">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link${activeId === link.id ? " active" : ""}`}
              onClick={(e) => handleLinkClick(e, link.id)}
            >
              <span className="nav-link-dot access-live-dot" />
              {link.label}
            </a>
          ))}
        </div>

        <button
          className={`nav-toggle${mobileOpen ? " active" : ""}`}
          id="navToggle"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="navLinks"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
      </nav>

      <div
        className={`nav-overlay${mobileOpen ? " active" : ""}`}
        id="navOverlay"
        onClick={() => setMobileOpen(false)}
      />
    </>
  );
}
