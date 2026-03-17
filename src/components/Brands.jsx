const logos = [
  'Adidas.png', 'Converse.png', 'Jordan.png', 'New Balance.png',
  'Nike.png', 'Puma.png', 'Timberland.png', 'Tommy.png', 'Vans.png'
]

export default function Brands() {
  const track = [...logos, ...logos]

  return (
    <section className="bg-white py-12 overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-black text-3xl font-bold tracking-wide">Our Brands</h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {track.map((logo, i) => (
            <img
              key={i}
              src={`/${logo}`}
              alt={logo.replace('.png', '')}
              className="h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
