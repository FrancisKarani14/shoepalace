import { FaStar } from 'react-icons/fa'

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
    </section>
  )
}
