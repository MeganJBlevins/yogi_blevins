import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import { projects, projectCategories } from '../data/projects'
import './Projects.css'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter)

  return (
    <div className="projects-page">
      <section className="projects-hero section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Portfolio</span>
            <h1 className="section-title">My Projects</h1>
            <p className="section-description">
              A collection of projects that showcase my skills in design,
              development, and problem-solving. Each project represents a unique
              challenge and creative solution.
            </p>
          </motion.div>

          <motion.div
            className="projects-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            {projectCategories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${activeFilter === category.id ? 'filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="projects-grid-section section">
        <div className="container">
          <motion.div
            className="projects-grid projects-grid--large"
            initial="initial"
            animate="animate"
            variants={stagger}
            key={activeFilter}
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={fadeInUp}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              className="projects-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>No projects found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Projects

