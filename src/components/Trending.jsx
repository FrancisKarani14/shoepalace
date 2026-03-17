import { useNavigate } from 'react-router-dom'

const images = ['/Martins.png', '/Milano.png', '/Tommyhilfiger.png']

const WHATSAPP_NUMBER = '254700000000'

const shoes = [
  { id: 1, name: 'Dr. Martens Classic', price: 'KES 12,500' },
  { id: 2, name: 'Milano Leather', price: 'KES 9,800' },
  { id: 3, name: 'Tommy Hilfiger Sneaker', price: 'KES 11,200' },
  { id: 4, name: 'Dr. Martens Boot', price: 'KES 13,000' },
  { id: 5, name: 'Milano Sport', price: 'KES 8,500' },
  { id: 6, name: 'Tommy Hilfiger Classic', price: 'KES 10,500' },
  { id: 7, name: 'Dr. Martens Low', price: 'KES 11,800' },
  { id: 8, name: 'Milano Elite', price: 'KES 9,200' },
].map((shoe, i) => ({ ...shoe, image: images[i % images.length] }))

export default function Trending() {
  const navigate = useNavigate()

  const handleOrder = (shoe) => {
    const msg = `Hi, I'd like to order *${shoe.name}* — ${shoe.price}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section className="bg-neutral-950 py-16 px-6">
      <div className="text-center mb-10">
        <h2 className="text-white text-4xl font-bold tracking-wide">This Week's Trends</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {shoes.map((shoe) => (
          <div key={shoe.id} className="bg-neutral-900 rounded-xl overflow-hidden group hover:scale-105 transition-transform duration-300">
            <img src={shoe.image} alt={shoe.name} className="w-full h-56 object-cover" />
            <div className="p-4">
              <p className="text-white font-semibold text-sm">{shoe.name}</p>
              <p className="text-yellow-400 mt-1 text-sm mb-3">{shoe.price}</p>
              <button
                onClick={() => handleOrder(shoe)}
                className="w-full bg-green-600 hover:bg-green-500 text-white text-xs font-semibold py-2 rounded transition-colors duration-300 cursor-pointer"
              >
                Order on WhatsApp
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
