import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaWhatsapp } from 'react-icons/fa'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Collections', path: '/collections' },
  { label: 'Men', path: '/collections/men' },
  { label: 'Women', path: '/collections/women' },
  { label: 'Unisex', path: '/collections/unisex' },
  { label: 'Contact Us', path: '/contact' },
]

const socials = [
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaTiktok, href: '#', label: 'TikTok' },
  { icon: FaWhatsapp, href: '#', label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="relative text-white">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/LOGO.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/85" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div className="flex flex-col gap-4">
          <img src="/LOGO.png" alt="Shoe Palace" className="h-20 object-contain w-fit" />
          <p className="text-white/50 text-sm leading-relaxed">
            Your global footwear marketplace. Authentic shoes, fast delivery, and easy WhatsApp ordering.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-yellow-400 font-bold text-lg tracking-wide uppercase">Quick Links</h4>
          <ul className="flex flex-col gap-2">
            {quickLinks.map(({ label, path }) => (
              <li key={label}>
                <Link to={path} className="text-white/60 text-sm hover:text-yellow-400 transition-colors duration-300">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-4">
          <h4 className="text-yellow-400 font-bold text-lg tracking-wide uppercase">Follow Us</h4>
          <div className="flex gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="bg-white/10 hover:bg-yellow-400 hover:text-black text-white p-3 rounded-full transition-colors duration-300"
              >
                <Icon className="text-lg" />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10 py-4 text-center text-white/40 text-xs">
        © {new Date().getFullYear()} Shoe Palace. All rights reserved.
      </div>
    </footer>
  )
}
