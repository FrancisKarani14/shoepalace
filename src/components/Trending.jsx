import { useNavigate } from 'react-router-dom'
import { allShoes } from '../data/shoes'

const shoes = allShoes.filter(s => [3, 4, 5, 6, 7, 8, 9, 10].includes(s.id))

export default function Trending() {
  const navigate = useNavigate()

  return (
    <section className="bg-neutral-950 py-16 px-6">
      <div className="text-center mb-10">
        <h2 className="text-white text-4xl font-bold tracking-wide">This Week's Trends</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
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

      <div className="text-center mt-12">
        <button
          onClick={() => navigate('/collections')}
          className="border-2 border-white text-white px-10 py-3 text-sm font-semibold hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
        >
          View More
        </button>
      </div>
    </section>
  )
}
