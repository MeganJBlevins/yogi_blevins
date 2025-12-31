import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, CodeIcon, BrainIcon, RocketIcon, PaletteIcon } from '../components/Icons'
import ProjectCard from '../components/ProjectCard'
import { featuredProjects } from '../data/projects'
import './Home.css'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const skills = [
  { icon: CodeIcon, title: 'Development', description: 'Clean, efficient code with modern frameworks and best practices.' },
  { icon: PaletteIcon, title: 'Design', description: 'Intuitive interfaces that blend form with function seamlessly.' },
  { icon: BrainIcon, title: 'Problem Solving', description: 'Creative solutions to complex technical challenges.' },
  { icon: RocketIcon, title: 'Performance', description: 'Optimized applications that deliver exceptional user experiences.' },
]

function Home() {
  return (
    <>
      <section className="hero section">
        <div className="container">
          <motion.div
            className="hero-content"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div className="hero-badge" variants={fadeInUp}>
              <span className="hero-badge-dot" />
              Available for new projects
            </motion.div>

            <motion.h1 className="hero-title" variants={fadeInUp}>
              I build <span className="gradient-text">digital experiences</span> that
              make an impact
            </motion.h1>

            <motion.p className="hero-description" variants={fadeInUp}>
              Full-stack developer passionate about crafting beautiful, performant web
              applications. I transform ideas into elegant solutions that users love.
            </motion.p>

            <motion.div className="hero-actions" variants={fadeInUp}>
              <Link to="/projects" className="btn btn-primary">
                View My Work
                <ArrowRightIcon />
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get in Touch
              </Link>
            </motion.div>

            <motion.div className="hero-stats" variants={fadeInUp}>
              <div className="hero-stat">
                <span className="hero-stat-value">5+</span>
                <span className="hero-stat-label">Years Experience</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">50+</span>
                <span className="hero-stat-label">Projects Completed</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">100%</span>
                <span className="hero-stat-label">Client Satisfaction</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-visual-inner">
              <div className="hero-visual-code">
                <div className="hero-visual-code-header">
                  <span className="hero-visual-dot hero-visual-dot--red" />
                  <span className="hero-visual-dot hero-visual-dot--yellow" />
                  <span className="hero-visual-dot hero-visual-dot--green" />
                </div>
                <pre className="hero-visual-code-content">
                  <code>
{`const Developer = {
  name: "Yogi Blevins",
  skills: [
    "React", "TypeScript",
    "Node.js", "Python"
  ],
  passion: "Building amazing UX",
  status: "Ready to collaborate"
};`}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="skills-section section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">What I Do</span>
            <h2 className="section-title">Expertise that drives results</h2>
          </motion.div>

          <motion.div
            className="skills-grid"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                className="skill-card card"
                variants={fadeInUp}
                custom={index}
              >
                <div className="skill-icon">
                  <skill.icon />
                </div>
                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-description">{skill.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="featured-section section">
        <div className="container">
          <motion.div
            className="section-header featured-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="section-label">Featured Work</span>
              <h2 className="section-title">Selected Projects</h2>
            </div>
            <Link to="/projects" className="btn btn-secondary">
              View All Projects
              <ArrowRightIcon />
            </Link>
          </motion.div>

          <motion.div
            className="projects-grid"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            {featuredProjects.slice(0, 3).map((project) => (
              <motion.div key={project.id} variants={fadeInUp}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="cta-section section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="cta-title">
              Let's build something <span className="gradient-text">amazing</span> together
            </h2>
            <p className="cta-description">
              Have a project in mind? I'd love to hear about it. Let's discuss how we can
              work together to bring your vision to life.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Start a Conversation
              <ArrowRightIcon />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home

