import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, DownloadIcon } from '../components/Icons'
import './About.css'

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

const technologies = {
  frontend: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Framer Motion'],
  backend: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs'],
  tools: ['Git', 'Docker', 'AWS', 'Figma', 'VS Code', 'Linux'],
}

const experience = [
  {
    title: 'Senior Full-Stack Developer',
    company: 'Tech Company',
    period: '2022 - Present',
    description: 'Leading development of scalable web applications and mentoring junior developers.',
  },
  {
    title: 'Full-Stack Developer',
    company: 'Digital Agency',
    period: '2020 - 2022',
    description: 'Built custom web solutions for diverse clients across multiple industries.',
  },
  {
    title: 'Frontend Developer',
    company: 'Startup',
    period: '2019 - 2020',
    description: 'Developed responsive interfaces and improved user experience metrics.',
  },
]

function About() {
  return (
    <div className="about-page">
      <section className="about-hero section">
        <div className="container">
          <div className="about-hero-grid">
            <motion.div
              className="about-hero-content"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.span className="section-label" variants={fadeInUp}>
                About Me
              </motion.span>
              <motion.h1 className="about-title" variants={fadeInUp}>
                I'm <span className="gradient-text">Yogi Blevins</span>, a developer
                who loves building things
              </motion.h1>
              <motion.p className="about-description" variants={fadeInUp}>
                With over 5 years of experience in web development, I specialize in
                creating performant, accessible, and beautiful digital experiences.
                I believe that great software is the result of understanding both the
                technical and human aspects of a problem.
              </motion.p>
              <motion.p className="about-description" variants={fadeInUp}>
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with the
                developer community. I'm passionate about continuous learning and
                staying at the forefront of web development.
              </motion.p>
              <motion.div className="about-actions" variants={fadeInUp}>
                <Link to="/contact" className="btn btn-primary">
                  Get in Touch
                  <ArrowRightIcon />
                </Link>
                <a href="/resume.pdf" className="btn btn-secondary" download>
                  Download Resume
                  <DownloadIcon />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="about-hero-image"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="about-image-wrapper">
                <div className="about-image-placeholder">
                  <span>YB</span>
                </div>
                <div className="about-image-decoration" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="tech-section section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Technologies</span>
            <h2 className="section-title">My Tech Stack</h2>
          </motion.div>

          <motion.div
            className="tech-grid"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <motion.div className="tech-category card" variants={fadeInUp}>
              <h3 className="tech-category-title">Frontend</h3>
              <div className="tech-tags">
                {technologies.frontend.map((tech) => (
                  <span key={tech} className="badge badge-accent">{tech}</span>
                ))}
              </div>
            </motion.div>

            <motion.div className="tech-category card" variants={fadeInUp}>
              <h3 className="tech-category-title">Backend</h3>
              <div className="tech-tags">
                {technologies.backend.map((tech) => (
                  <span key={tech} className="badge badge-teal">{tech}</span>
                ))}
              </div>
            </motion.div>

            <motion.div className="tech-category card" variants={fadeInUp}>
              <h3 className="tech-category-title">Tools & Infrastructure</h3>
              <div className="tech-tags">
                {technologies.tools.map((tech) => (
                  <span key={tech} className="badge">{tech}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="experience-section section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Experience</span>
            <h2 className="section-title">Career Journey</h2>
          </motion.div>

          <motion.div
            className="experience-timeline"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            {experience.map((job, index) => (
              <motion.div
                key={index}
                className="experience-item"
                variants={fadeInUp}
              >
                <div className="experience-marker">
                  <span className="experience-dot" />
                  {index < experience.length - 1 && <span className="experience-line" />}
                </div>
                <div className="experience-content card">
                  <span className="experience-period">{job.period}</span>
                  <h3 className="experience-title">{job.title}</h3>
                  <span className="experience-company">{job.company}</span>
                  <p className="experience-description">{job.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="values-section section">
        <div className="container">
          <motion.div
            className="values-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Philosophy</span>
            <h2 className="values-title">
              I believe in writing code that's not just functional, but
              <span className="gradient-text"> maintainable, scalable, and elegant</span>
            </h2>
            <p className="values-description">
              Every line of code is an opportunity to create something meaningful.
              I approach each project with attention to detail, a focus on user
              experience, and a commitment to best practices that stand the test of time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About

