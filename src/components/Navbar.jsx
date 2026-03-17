import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <nav className="bg-black sticky top-0 z-50 w-full">
      <div className="flex flex-col items-center py-3">

        {/* Logo */}
        <NavLink to="/">
          <img src="/LOGO.png" alt="Shoe Palace" className="h-24 object-contain mb-2" />
        </NavLink>

        {/* Nav Links */}
        <ul className="flex items-center gap-8 text-white text-sm font-medium tracking-wide">

          <li>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? 'text-yellow-400' : 'hover:text-yellow-400 transition-colors'}
            >
              Home
            </NavLink>
          </li>

          {/* Collections with dropdown */}
          <li className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
              className="flex items-center gap-1 hover:text-yellow-400 transition-colors cursor-pointer"
            >
              Collections
              <span className="text-xs">{dropdownOpen ? '▲' : '▼'}</span>
            </button>

            {dropdownOpen && (
              <ul className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black border border-white/10 rounded w-36 text-center shadow-lg">
                {['Men', 'Women', 'Kids'].map((cat) => (
                  <li key={cat}>
                    <NavLink
                      to={`/collections/${cat.toLowerCase()}`}
                      className="block px-4 py-2 hover:bg-white/10 hover:text-yellow-400 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {cat}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => isActive ? 'text-yellow-400' : 'hover:text-yellow-400 transition-colors'}
            >
              Contact Us
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>
  )
}
