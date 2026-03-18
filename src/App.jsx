import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Products from './pages/Products'
import Contact from './pages/Contact'

const WHATSAPP_NUMBER = '254700000000'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/collections" element={<Products />} />
          <Route path="/collections/:category" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Sticky WhatsApp button */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-400 text-white p-4 rounded-full shadow-lg transition-colors duration-300"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="text-2xl" />
        </a>
      </div>
    </BrowserRouter>
  )
}

export default App
