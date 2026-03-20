import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import Products from './pages/Products'
import Details from './pages/Details'
import Admin from './pages/Admin'
import Login from './pages/Login'
import { supabase } from './lib/supabase'

const WHATSAPP_NUMBER = '254707011888'

function ProtectedRoute({ children, session }) {
  if (session === undefined) return null // still loading
  return session ? children : <Navigate to="/admin/login" replace />
}

function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const isAdmin = location.pathname.startsWith('/admin')
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    const hash = window.location.hash
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (data.session && hash.includes('access_token')) {
        navigate('/admin')
      }
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s)
      if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && s) {
        navigate('/admin')
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="min-h-screen">
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/collections" element={<Products />} />
        <Route path="/collections/:category" element={<Products />} />
        <Route path="/shoe/:id" element={<Details />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/*" element={<ProtectedRoute session={session}><Admin /></ProtectedRoute>} />
      </Routes>
      {!isAdmin && <Footer />}
      {!isAdmin && (
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-400 text-white p-4 rounded-full shadow-lg transition-colors duration-300"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="text-2xl" />
        </a>
      )}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
