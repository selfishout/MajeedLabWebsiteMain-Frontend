import './Navbar.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTractor } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom'
import { siteConfig } from '../../data/siteConfig'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 32)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Lab' },
    { to: '/publications', label: 'Publications' },
    { to: '/news-events', label: 'News & Events' },
    { to: '/students', label: 'Team' }
  ]

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-logo">
        <FontAwesomeIcon icon={faTractor} style={{ marginRight: '0.5rem' }} />
        <div className="navbar-brand">
          <span className="lab-name">{siteConfig.labName}</span>
          <span className="lab-tagline">{siteConfig.tagline}</span>
        </div>
      </div>
      <ul className="navbar-links">
        {navItems.map((item) => (
          <li key={item.to} className={location.pathname === item.to ? 'active' : ''}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
