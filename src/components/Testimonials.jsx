import { FaStar, FaShieldAlt, FaHeadset, FaUndo, FaTruck } from 'react-icons/fa'

const testimonials = [
  {
    name: 'Mark Munene',
    message: 'Absolutely love my new kicks! The quality is top notch and delivery was super fast. Will definitely be ordering again.',
  },
  {
    name: 'Aman Maina',
    message: 'Best shoe shop online. Got my Timberlands in perfect condition. The WhatsApp ordering process was so easy and convenient.',
  },
  {
    name: 'Naomi Nyanswi',
    message: 'Found the perfect pair for my outfit. Great selection across all categories. Highly recommend Shoe Palace!',
  },
  {
    name: 'Felister Wairimu',
    message: 'Ordered through WhatsApp and the response was instant. My shoes arrived well packaged. 10/10 experience!',
  },
]

const cta = [
  { icon: FaShieldAlt, title: 'Authentic Products', desc: '100% genuine shoes from verified brands' },
  { icon: FaHeadset, title: '24/7 Support', desc: 'We are always here to help you out' },
  { icon: FaUndo, title: 'Easy Returns', desc: 'Hassle-free returns within 7 days' },
  { icon: FaTruck, title: 'Fast Delivery', desc: 'Quick delivery right to your doorstep' },
]

export default function Testimonials() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="text-center mb-10">
        <h2 className="text-black text-4xl font-bold tracking-wide">What Our Customers Say</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {testimonials.map(({ name, message }) => (
          <div key={name} className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col gap-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-lg" />
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">"{message}"</p>
            <p className="text-black font-bold text-sm mt-auto">— {name}</p>
          </div>
        ))}
      </div>

      {/* CTA Strip */}
      <div className="mt-16 bg-yellow-400 border border-yellow-400 rounded-xl max-w-6xl mx-auto px-8 py-8 flex flex-col items-center gap-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
          {cta.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="flex items-center gap-6">
              {i !== 0 && <div className="hidden md:block w-px h-16 bg-gray-300" />}
              <div className="flex flex-col items-center text-center gap-1">
                <Icon className="text-2xl text-black" />
                <p className="text-black font-bold text-sm">{title}</p>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => window.location.href = '/collections'}
          className="bg-black text-white px-8 py-3 text-sm font-semibold hover:bg-gray-800 transition-colors duration-300 rounded cursor-pointer"
        >
          View Products
        </button>
      </div>
    </section>
  )
}
