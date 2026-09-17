import { liveStatFields } from "../data/content";
import { useStats } from "../context/StatsContext";
import { useAnimatedNumber } from "../hooks/useAnimatedNumber";
import { useTilt } from "../hooks/useTilt";
import Icon from "./Icon";

function StatCard({ icon, label, value }) {
  const ref = useTilt({ strength: 20, translateY: -10, translateZ: 20 });
  const animated = useAnimatedNumber(value);

  return (
    <div className="contact-card hud-panel" ref={ref}>
      <div className="contact-icon">
        <Icon name={icon} />
      </div>
      <div className="contact-info">
        <div className="contact-label">{label.section}</div>
        <div className="contact-value">
          <span className="stat-live-number">{animated === null ? "–" : animated}</span>{" "}
          {label.value}
        </div>
      </div>
    </div>
  );
}

const sectionLabels = {
  totalVisits: "Page Visits",
  totalClicks: "Engagement",
  authorizedUsers: "Access",
  activeWarehouses: "Warehouses",
  configuredZones: "Zones",
  trackedItems: "Stock",
};

export default function LiveAnalysis() {
  const { stats, note } = useStats();

  return (
    <section id="live-analysis" className="contact-section">
      <h2 className="section-title">
        <span className="title-number">06.</span>
        <span className="title-text">Live Analysis</span>
      </h2>
      <div className="contact-content">
        <p className="contact-text">
          Real numbers, pulled straight from the database behind WareForge — not
          placeholders.
        </p>

        <div className="contact-methods" style={{ marginTop: "3rem" }} id="liveStatsGrid">
          {liveStatFields.map((field) => (
            <StatCard
              key={field.key}
              icon={field.icon}
              label={{ section: sectionLabels[field.key], value: field.label }}
              value={stats ? stats[field.key] : null}
            />
          ))}
        </div>
        <p className="pricing-note" id="liveStatsNote" style={{ marginTop: "1.5rem", opacity: 0.7 }}>
          {note}
        </p>
      </div>
    </section>
  );
}