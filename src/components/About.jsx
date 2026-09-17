import { expertiseItems } from "../data/content";
import { useTilt } from "../hooks/useTilt";

function ExpertiseItem({ icon, title, desc }) {
  const ref = useTilt({ strength: 10, translateY: -10, translateZ: 20 });
  return (
    <div className="expertise-item hud-panel" ref={ref}>
      <div className="expertise-icon">{icon}</div>
      <div className="expertise-title">{title}</div>
      <div className="expertise-desc">{desc}</div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="about-section">
      <h2 className="section-title">
        <span className="title-number">01.</span>
        <span className="title-text">About WareForge</span>
      </h2>
      <div className="about-content">
        <div className="about-text">
          <p className="about-intro">
            A flexible warehouse management system built around the way your warehouse
            actually works.
          </p>
          <p>
            WareForge lets you create and manage multiple warehouses without being
            restricted to a fixed layout. Define the length and breadth of each
            warehouse, divide the space into custom zones, and organize inventory
            exactly where it belongs. Each item can have its own quantity and minimum
            stock threshold, making it easier to understand what is available and what
            needs attention. You can also switch to a spreadsheet-style Table View to
            browse, search, and filter everything — scoped to one warehouse or all of
            them — and import or export your data through Excel.
          </p>
          <div className="expertise-grid">
            {expertiseItems.map((item) => (
              <ExpertiseItem key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
