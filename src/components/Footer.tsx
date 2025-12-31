import { Link } from 'react-router-dom'
import './Footer.css'
import { EmailIcon, GithubIcon, LinkedInIcon, TwitterIcon } from './Icons'

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
  { icon: LinkedInIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
  { icon: EmailIcon, href: 'mailto:hello@example.com', label: 'Email' },
]

const footerLinks = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="gradient-text">YB</span>
              <span className="footer-logo-dot" />
            </Link>
            <p className="footer-tagline">
              Building digital experiences that make a difference.
            </p>
          </div>

          <nav className="footer-nav">
            <h3 className="footer-nav-title">Navigation</h3>
            <ul className="footer-nav-links">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-social">
            <h3 className="footer-nav-title">Connect</h3>
            <div className="footer-social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link"
                  aria-label={social.label}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Yogi Blevins. All rights reserved.
          </p>
          <p className="footer-credits">
            Crafted with care in the digital realm.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

