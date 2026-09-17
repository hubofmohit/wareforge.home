import { underTheHood } from "../data/content";
import { useTilt } from "../hooks/useTilt";
import Icon from "./Icon";

function InfoCard({ icon, label, value }) {
  const ref = useTilt({ strength: 20, translateY: -10, translateZ: 20 });
  return (
    <div className="contact-card hud-panel" ref={ref}>
      <div className="contact-icon">
        <Icon name={icon} />
      </div>
      <div className="contact-info">
        <div className="contact-label">{label}</div>
        <div className="contact-value">{value}</div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">
        <span className="title-number">05.</span>
        <span className="title-text">Under the Hood</span>
      </h2>
      <div className="contact-content">
        <div className="contact-methods" style={{ marginTop: "3rem" }}>
          {underTheHood.map((item) => (
            <InfoCard key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
