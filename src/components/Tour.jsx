import { tourSteps } from "../data/content";

export default function Tour({ onOpenLightbox }) {
  return (
    <section id="tour" className="tour-section">
      <h2 className="section-title">
        <span className="title-number">02.</span>
        <span className="title-text">See WareForge in Action</span>
      </h2>
      <p className="tour-intro">
        Two screens, everything you need: shape the floor, then track what's on it.
      </p>
      <div className="tour-grid">
        {tourSteps.map((item) => (
          <div className={`tour-item${item.reverse ? " reverse" : ""}`} key={item.title}>
            <div className="browser-frame hud-panel">
              <div className="browser-bar">
                <span className="browser-dot" />
                <span className="browser-dot" />
                <span className="browser-dot" />
                <span className="browser-url">{item.url}</span>
              </div>
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="tour-image"
                onClick={(e) => onOpenLightbox(e.currentTarget.src, item.alt)}
              />
            </div>
            <div className="tour-caption">
              <span className="tour-step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
