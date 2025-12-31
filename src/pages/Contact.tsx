import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { SendIcon, CheckIcon, GithubIcon, LinkedInIcon, TwitterIcon, EmailIcon } from '../components/Icons'
import './Contact.css'

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

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com', label: 'GitHub', handle: '@yogiblevins' },
  { icon: LinkedInIcon, href: 'https://linkedin.com', label: 'LinkedIn', handle: 'Yogi Blevins' },
  { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter', handle: '@yogiblevins' },
  { icon: EmailIcon, href: 'mailto:hello@yogiblevins.com', label: 'Email', handle: 'hello@yogiblevins.com' },
]

function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: '', email: '', subject: '', message: '' })

    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="contact-page">
      <section className="contact-hero section">
        <div className="container">
          <motion.div
            className="section-header contact-header"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.span className="section-label" variants={fadeInUp}>
              Contact
            </motion.span>
            <motion.h1 className="section-title" variants={fadeInUp}>
              Let's work together
            </motion.h1>
            <motion.p className="section-description" variants={fadeInUp}>
              Have a project in mind or just want to say hello? I'd love to hear from you.
              Fill out the form below or reach out through any of my social channels.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="contact-content section">
        <div className="container">
          <div className="contact-grid">
            <motion.div
              className="contact-form-wrapper"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input"
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="input"
                    placeholder="What's this about?"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="input textarea"
                    placeholder="Tell me about your project..."
                    value={formState.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary contact-submit ${isSubmitting ? 'contact-submit--loading' : ''} ${isSubmitted ? 'contact-submit--success' : ''}`}
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <CheckIcon />
                      Message Sent!
                    </>
                  ) : isSubmitting ? (
                    <>
                      <span className="contact-submit-spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <SendIcon />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="contact-info-card card">
                <h3 className="contact-info-title">Connect With Me</h3>
                <p className="contact-info-description">
                  Feel free to reach out through any of these platforms. I'm most
                  active on Twitter and respond to emails within 24 hours.
                </p>

                <div className="contact-social-list">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-item"
                    >
                      <span className="contact-social-icon">
                        <social.icon />
                      </span>
                      <span className="contact-social-info">
                        <span className="contact-social-label">{social.label}</span>
                        <span className="contact-social-handle">{social.handle}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="contact-availability card">
                <div className="contact-availability-indicator">
                  <span className="contact-availability-dot" />
                  <span>Available for projects</span>
                </div>
                <p className="contact-availability-text">
                  I'm currently accepting new projects and would love to hear about
                  what you're building. Let's create something amazing together.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

