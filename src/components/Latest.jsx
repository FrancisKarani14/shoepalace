import { useNavigate } from 'react-router-dom'
import { allShoes } from '../data/shoes'

const shoes = allShoes.slice(0, 8)

export default function Latest() {
  const navigate = useNavigate()

  return (
    <section className="relative py-16 px-6">
      <div className="absolute inset-0 z-0">
        <img src="/contact.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-10 text-center mb-10">
        <h2 className="text-white text-4xl font-bold tracking-wide">Latest</h2>
        <h5 className="text-white/60 mt-2 text-lg">Fresh drops, just for you</h5>
      </div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {shoes.map((shoe) => (
          <div key={shoe.id} className="bg-neutral-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
            <img src={shoe.image} alt={shoe.name} className="w-full h-56 object-cover" />
            <div className="p-4">
              <p className="text-white font-semibold text-sm">{shoe.name}</p>
              <p className="text-yellow-400 mt-1 text-sm mb-3">KES {shoe.price.toLocaleString()}</p>
              <button
                onClick={() => navigate(`/shoe/${shoe.id}`)}
                className="w-full bg-neutral-800 hover:bg-yellow-400 hover:text-black text-white text-xs font-semibold py-2 rounded transition-colors duration-300 cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
