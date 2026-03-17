import { useNavigate } from 'react-router-dom'

const images = ['/Martins.png', '/Milano.png', '/Tommyhilfiger.png']

const latestShoes = [
  { id: 1, name: 'Dr. Martens Classic', price: 'KES 12,500' },
  { id: 2, name: 'Milano Leather', price: 'KES 9,800' },
  { id: 3, name: 'Tommy Hilfiger Sneaker', price: 'KES 11,200' },
  { id: 4, name: 'Dr. Martens Boot', price: 'KES 13,000' },
  { id: 5, name: 'Milano Sport', price: 'KES 8,500' },
  { id: 6, name: 'Tommy Hilfiger Classic', price: 'KES 10,500' },
  { id: 7, name: 'Dr. Martens Low', price: 'KES 11,800' },
  { id: 8, name: 'Milano Elite', price: 'KES 9,200' },
].map((shoe, i) => ({ ...shoe, image: images[i % images.length] }))

const categories = [
  { name: 'Men', image: '/men.png', path: '/collections/men' },
  { name: 'Women', image: '/women.png', path: '/collections/women' },
  { name: 'Unisex', image: '/unisex.png', path: '/collections/unisex' },
]

export default function Categories() {
  const navigate = useNavigate()

  return (
    <section className="bg-neutral-950 py-16 px-6">
      <div className="text-center mb-10">
        <h2 className="text-white text-4xl font-bold tracking-wide">Shop By Category</h2>
        <h5 className="text-white/60 mt-2 text-lg">Find the perfect style for everyone</h5>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
        {categories.map(({ name, image, path }) => (
          <div
            key={name}
            className="relative flex-1 h-96 rounded-xl overflow-hidden group cursor-pointer"
            onClick={() => navigate(path)}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-white">
              <h3 className="text-3xl font-bold tracking-wide mb-3">{name}</h3>
              <button className="border border-white px-5 py-2 text-sm font-medium hover:bg-white hover:text-black transition-colors duration-300">
                Explore More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
