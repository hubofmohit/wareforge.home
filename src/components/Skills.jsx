import { useEffect, useRef, useState } from "react";
import { skillCategories } from "../data/content";

function SkillCard({ name, level }) {
  const ref = useRef(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setFilled(true), 200);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-card hud-panel" ref={ref} style={{ "--skill-level": `${level}%` }}>
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-percentage">{level}%</span>
      </div>
      <div className="skill-bar-bg">
        <div
          className="skill-bar"
          style={{ width: filled ? `${level}%` : 0 }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">
        <span className="title-number">03.</span>
        <span className="title-text">How WareForge Organizes Your Warehouse</span>
      </h2>
      <div className="skills-container">
        {skillCategories.map((category) => (
          <div className="skill-category" key={category.title}>
            <h3 className="category-title">{category.title}</h3>
            <div className="skills-grid">
              {category.skills.map((skill) => (
                <SkillCard key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
