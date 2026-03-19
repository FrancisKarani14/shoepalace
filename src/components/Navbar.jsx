import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const goTo = (path) => {
    navigate(path)
    setDropdownOpen(false)
    setMenuOpen(false)
  }

  const goToContact = () => {
    setMenuOpen(false)
    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300)
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="bg-[#F8FAFC] sticky top-0 z-50 w-full shadow-sm">
      <div className="flex flex-col items-center py-2">

        {/* Logo + hamburger row */}
        <div className="w-full flex items-center justify-between px-6 md:justify-center">
          <NavLink to="/">
            <img src="/LOGO2.png" alt="Shoe Palace" className="h-14 object-contain" />
          </NavLink>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-black text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide mt-1">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-yellow-500' : 'text-black hover:text-yellow-500 transition-colors'}>
              Home
            </NavLink>
          </li>

          <li className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
              className="flex items-center gap-1 text-black hover:text-yellow-500 transition-colors cursor-pointer"
            >
              Collections
              <span className="text-xs">{dropdownOpen ? '▲' : '▼'}</span>
            </button>

            {dropdownOpen && (
              <ul className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#F8FAFC] border border-black/10 rounded w-36 text-center shadow-lg">
                {['All', 'Men', 'Women', 'Unisex'].map((cat) => (
                  <li key={cat}>
                    <button
                      className="block w-full px-4 py-2 text-black hover:bg-black/5 hover:text-yellow-500 transition-colors cursor-pointer text-sm"
                      onMouseDown={() => goTo(cat === 'All' ? '/collections' : `/collections/${cat.toLowerCase()}`)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <button onClick={goToContact} className="text-black hover:text-yellow-500 transition-colors cursor-pointer">
              Contact Us
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#F8FAFC] border-t border-black/10 px-6 py-4 flex flex-col gap-4 text-sm font-medium">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'text-yellow-500' : 'text-black'}>
            Home
          </NavLink>

          <div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-black w-full"
            >
              Collections <span className="text-xs">{dropdownOpen ? '▲' : '▼'}</span>
            </button>
            {dropdownOpen && (
              <ul className="mt-2 flex flex-col gap-2 pl-4">
                {['All', 'Men', 'Women', 'Unisex'].map((cat) => (
                  <li key={cat}>
                    <button
                      className="text-black hover:text-yellow-500 transition-colors cursor-pointer"
                      onClick={() => goTo(cat === 'All' ? '/collections' : `/collections/${cat.toLowerCase()}`)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button onClick={goToContact} className="text-black text-left">
            Contact Us
          </button>
        </div>
      )}
    </nav>
  )
}
