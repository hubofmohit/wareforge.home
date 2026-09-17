import projects from "../data/projects";
import { useTilt } from "../hooks/useTilt";

function ProjectCard({ project, onOpen }) {
  const ref = useTilt({ strength: 15, translateY: -15, translateZ: 0 });

  return (
    <div
      className="project-card"
      ref={ref}
      style={{ "--project-color": project.color }}
      onClick={() => onOpen(project)}
    >
      <div className="project-header">
        <span className="project-number">{project.number}</span>
        <span className="project-category">{project.category}</span>
      </div>
      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tech">
          {project.tech.map((tech) => (
            <span className="tech-tag" key={tech}>
              {tech}
            </span>
          ))}
        </div>
        <div className="project-metrics">
          {Object.entries(project.metrics).map(([key, value]) => (
            <div className="metric" key={key}>
              <span className="metric-value">{value}</span>
              <span className="metric-label">{key}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ onOpenProject }) {
  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">
        <span className="title-number">04.</span>
        <span className="title-text">Core Features</span>
      </h2>
      <div className="projects-grid" id="projectsGrid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={onOpenProject} />
        ))}
      </div>
    </section>
  );
}
