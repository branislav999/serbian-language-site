import React from 'react'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-brand">🇷🇸 Learn Serbian</h3>
          <p className="footer-about">
            Immerse yourself in the beautiful Serbian language and culture.
          </p>
          <div className="social-icons">
            <SocialIcon icon="📘" url="#" />
            <SocialIcon icon="📸" url="#" />
            <SocialIcon icon="🎥" url="#" />
            <SocialIcon icon="💬" url="#" />
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-list">
            <FooterLink href="/lessons" text="Beginner Lessons" />
            <FooterLink href="/quizzes" text="Interactive Quizzes" />
            <FooterLink href="/culture" text="Cultural Insights" />
            <FooterLink href="/blog" text="Language Blog" />
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Resources</h4>
          <ul className="footer-list">
            <FooterLink href="/dictionary" text="Serbian Dictionary" />
            <FooterLink href="/grammar" text="Grammar Guide" />
            <FooterLink href="/pronunciation" text="Pronunciation Tips" />
            <FooterLink href="/faq" text="FAQ" />
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact Us</h4>
          <ul className="footer-list">
            <li>📧 hello@learnserbian.com</li>
            <li>📍 Belgrade, Serbia</li>
            <li>🕒 Mon-Fri: 9AM - 5PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Learn Serbian. All rights reserved.</p>
        <ul className="footer-bottom-links">
          <FooterLink href="/privacy" text="Privacy Policy" small />
          <FooterLink href="/terms" text="Terms of Service" small />
          <FooterLink href="/cookies" text="Cookie Policy" small />
        </ul>
      </div>
    </footer>
  )
}

function FooterLink({ href, text, small }) {
  return (
    <li className={small ? 'footer-small-link' : ''}>
      <a href={href}>{text}</a>
    </li>
  )
}

function SocialIcon({ icon, url }) {
  return (
    <a href={url} className="social-icon">
      {icon}
    </a>
  )
}

export default Footer
