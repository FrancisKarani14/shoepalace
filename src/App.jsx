import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import Products from './pages/Products'
// import Contact from './pages/Contact'
import Details from './pages/Details'
import Admin from './pages/Admin'

const WHATSAPP_NUMBER = '254707011888'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/collections" element={<Products />} />
          <Route path="/collections/:category" element={<Products />} />
          <Route path="/shoe/:id" element={<Details />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />

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
