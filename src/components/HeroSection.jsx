import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const images = ['/hs.jpg', '/lp.jpg']

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((img, i) => (
        <img
          key={img}
          src={img}
          alt="hero"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-wide mb-4">
          Global Footwear Marketplace
        </h1>
        <button
          onClick={() => navigate('/collections')}
          className="mt-6 px-8 py-3 border-2 border-white text-white text-lg font-semibold hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
        >
          Collections
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  )
}
