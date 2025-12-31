import { ExternalLinkIcon, GithubIcon } from './Icons'
import { Project } from '../data/projects'
import './ProjectCard.css'

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card card">
      <div className="project-card-image">
        <div 
          className="project-card-image-placeholder"
          style={{ 
            background: `linear-gradient(135deg, ${project.color}30 0%, ${project.color}10 100%)` 
          }}
        >
          <span style={{ color: project.color }}>{project.title.charAt(0)}</span>
        </div>
      </div>

      <div className="project-card-content">
        <div className="project-card-header">
          <h3 className="project-card-title">{project.title}</h3>
          <div className="project-card-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
                aria-label="View on GitHub"
              >
                <GithubIcon />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
                aria-label="View live site"
              >
                <ExternalLinkIcon />
              </a>
            )}
          </div>
        </div>

        <p className="project-card-description">{project.description}</p>

        <div className="project-card-tags">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="badge">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="badge">+{project.technologies.length - 4}</span>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard

