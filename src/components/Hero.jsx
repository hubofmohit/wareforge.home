import { useEffect, useRef, useState } from "react";
import { heroStats } from "../data/content";
import { useCountUp } from "../hooks/useCountUp";
import { useStats } from "../context/StatsContext";

function StatItem({ count, label }) {
  const [ref, display] = useCountUp(count);
  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-number">{display}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// Fetches the standalone hero floor-plan SVG (public/assets/hero-floor-plan.svg)
// and injects its markup, so its internal classes/ids (.wf-zone, #wfScene,
// #wfStatusText) keep working with styles.css and the parallax/status
// wiring below — matching the original loadHeroVisual()/initHeroVisual().
function HeroVisual() {
  const containerRef = useRef(null);
  const [svgMarkup, setSvgMarkup] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/assets/hero-floor-plan.svg")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load hero-floor-plan.svg");
        return res.text();
      })
      .then((markup) => {
        if (!cancelled) setSvgMarkup(markup);
      })
      .catch((err) => {
        // If the SVG can't be fetched, fail quietly rather than leaving a
        // broken layout.
        console.warn("Hero visual could not be loaded:", err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!svgMarkup) return undefined;

    // Cycle the status readout so the panel feels alive.
    const states = ["DYNAMIC", "SYNCED", "LIVE"];
    let i = 0;
    const statusText = document.getElementById("wfStatusText");
    let interval;
    if (statusText) {
      interval = setInterval(() => {
        i = (i + 1) % states.length;
        statusText.textContent = "● " + states[i];
      }, 2200);
    }

    // Subtle mouse-parallax tilt on the whole floor plan.
    const container = containerRef.current;
    const scene = document.getElementById("wfScene");
    function handleMove(e) {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      scene.style.transform = `translate(${x * 8}px,${y * 8}px)`;
    }
    function handleLeave() {
      scene.style.transform = "translate(0,0)";
    }
    if (container && scene) {
      container.addEventListener("mousemove", handleMove);
      container.addEventListener("mouseleave", handleLeave);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (container && scene) {
        container.removeEventListener("mousemove", handleMove);
        container.removeEventListener("mouseleave", handleLeave);
      }
    };
  }, [svgMarkup]);

  return (
    <div
      className="hero-visual"
      id="heroVisual"
      ref={containerRef}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svgMarkup || "" }}
    />
  );
}

export default function Hero() {
  const { trackClick } = useStats();

  function handleExplore() {
    trackClick("explore_features");
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-tag">&lt;Warehouse Management System /&gt;</div>
        <h1 className="hero-name">
          <span className="name-line">YOUR WAREHOUSE.</span>
          <span className="name-line highlight">YOUR RULES.</span>
        </h1>
        <p className="hero-tagline">
          Create warehouses that match your real floor plan, organize them into flexible
          zones, and keep complete control of your inventory from one place.
        </p>
        <div className="hero-stats">
          {heroStats.map((stat) => (
            <StatItem key={stat.label} count={stat.count} label={stat.label} />
          ))}
        </div>
        <button className="cta-button" onClick={handleExplore}>
          <span>Explore Features</span>
          <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <HeroVisual />
    </section>
  );
}