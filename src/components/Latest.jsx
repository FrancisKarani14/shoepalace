const images = ['/Martins.png', '/Milano.png', '/Tommyhilfiger.png']

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

export default function Latest() {
  return (
    <section className="bg-neutral-950 py-16 px-6">
      <div className="text-center mb-10">
        <h2 className="text-white text-4xl font-bold tracking-wide">Latest</h2>
        <h5 className="text-white/60 mt-2 text-lg">Fresh drops, just for you</h5>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {shoes.map(({ id, name, price, image }) => (
          <div key={id} className="bg-neutral-900 rounded-xl overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300">
            <img src={image} alt={name} className="w-full h-56 object-cover" />
            <div className="p-4">
              <p className="text-white font-semibold text-sm">{name}</p>
              <p className="text-yellow-400 mt-1 text-sm">{price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
