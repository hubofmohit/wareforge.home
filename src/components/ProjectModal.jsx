import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

export default function ProjectModal({ project, onClose }) {
  useBodyScrollLock(Boolean(project));

  return (
    <div className={`modal${project ? " active" : ""}`} id="projectModal">
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        {project && (
          <div
            className="project-modal-content"
            style={{ "--project-color": project.color }}
          >
            <div className="modal-header-section">
              <span className="modal-project-number" style={{ color: project.color }}>
                {project.number}
              </span>
              <h2 className="modal-project-title">{project.title}</h2>
              <span
                className="modal-project-category"
                style={{ borderColor: project.color, color: project.color }}
              >
                {project.category}
              </span>
            </div>

            <div className="modal-section">
              <h3 className="modal-section-title" style={{ color: project.color }}>
                Challenge
              </h3>
              <p className="modal-text">{project.details.challenge}</p>
            </div>

            <div className="modal-section">
              <h3 className="modal-section-title" style={{ color: project.color }}>
                Solution
              </h3>
              <p className="modal-text">{project.details.solution}</p>
            </div>

            <div className="modal-section">
              <h3 className="modal-section-title" style={{ color: project.color }}>
                Key Results
              </h3>
              <ul className="modal-results-list">
                {project.details.results.map((result) => (
                  <li className="modal-result-item" key={result}>
                    <span
                      className="result-bullet"
                      style={{ background: project.color }}
                    />
                    {result}
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal-section">
              <h3 className="modal-section-title" style={{ color: project.color }}>
                Technologies Used
              </h3>
              <div className="modal-tech-grid">
                {project.tech.map((tech) => (
                  <span
                    className="modal-tech-tag"
                    style={{ borderColor: project.color }}
                    key={tech}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-metrics-grid">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div className="modal-metric" key={key}>
                  <div className="modal-metric-value" style={{ color: project.color }}>
                    {value}
                  </div>
                  <div className="modal-metric-label">{key.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
