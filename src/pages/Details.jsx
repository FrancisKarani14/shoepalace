import { useParams, useNavigate } from 'react-router-dom'
import { allShoes } from '../data/shoes'
import { FaTruck, FaTag, FaShieldAlt } from 'react-icons/fa'

const WHATSAPP_NUMBER = '254700000000'

export default function Details() {
  const { id } = useParams()
  const navigate = useNavigate()
  const shoe = allShoes.find((s) => s.id === Number(id))

  if (!shoe) return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <p className="text-white/50">Shoe not found.</p>
    </div>
  )

  const related = allShoes.filter((s) => s.category === shoe.category && s.id !== shoe.id).slice(0, 4)

  const handleOrder = () => {
    const msg = `Hi, I'd like to order *${shoe.name}* — KES ${shoe.price.toLocaleString()}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Main Details */}
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 rounded-xl overflow-hidden">
            <img src={shoe.image} alt={shoe.name} className="w-full h-96 object-cover rounded-xl" />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <p className="text-yellow-400 text-xs uppercase tracking-widest">{shoe.brand} · {shoe.category}</p>
            <h1 className="text-white text-3xl font-bold">{shoe.name}</h1>
            <p className="text-yellow-400 text-2xl font-semibold">KES {shoe.price.toLocaleString()}</p>
            <p className="text-white/60 text-sm">{shoe.stock} pairs available in stock</p>

            {/* Info badges */}
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex items-center gap-3 bg-neutral-900 rounded-lg px-4 py-3">
                <FaTruck className="text-yellow-400 text-lg flex-shrink-0" />
                <p className="text-white/70 text-sm">Delivery within 2–4 business days across Kenya</p>
              </div>
              <div className="flex items-center gap-3 bg-neutral-900 rounded-lg px-4 py-3">
                <FaTag className="text-yellow-400 text-lg flex-shrink-0" />
                <p className="text-white/70 text-sm">
                  {shoe.price >= 20000
                    ? '🎉 This order qualifies for FREE shipping!'
                    : `Spend KES ${(20000 - shoe.price).toLocaleString()} more to unlock FREE shipping`}
                </p>
              </div>
              <div className="flex items-center gap-3 bg-neutral-900 rounded-lg px-4 py-3">
                <FaShieldAlt className="text-yellow-400 text-lg flex-shrink-0" />
                <p className="text-white/70 text-sm">100% authentic product · Easy 7-day returns</p>
              </div>
            </div>

            <button
              onClick={handleOrder}
              className="mt-4 w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition-colors duration-300 cursor-pointer"
            >
              Order on WhatsApp
            </button>
          </div>
        </div>

        {/* You May Also Like */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-white text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((s) => (
                <div
                  key={s.id}
                  className="bg-neutral-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => { navigate(`/shoe/${s.id}`); window.scrollTo(0, 0) }}
                >
                  <img src={s.image} alt={s.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <p className="text-white font-semibold text-sm">{s.name}</p>
                    <p className="text-yellow-400 mt-1 text-sm mb-3">KES {s.price.toLocaleString()}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/shoe/${s.id}`); window.scrollTo(0, 0) }}
                      className="w-full bg-neutral-800 hover:bg-yellow-400 hover:text-black text-white text-xs font-semibold py-2 rounded transition-colors duration-300 cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
