import { useState, useMemo, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const WHATSAPP_NUMBER = '254700000000'
const PER_PAGE = 12

const allShoes = [
  { id: 1,  name: 'Dr. Martens Classic',       price: 12500, brand: 'Dr. Martens',    category: 'men',    image: '/Martins.png' },
  { id: 2,  name: 'Milano Leather',             price: 9800,  brand: 'Milano',         category: 'women',  image: '/Milano.png' },
  { id: 3,  name: 'Tommy Hilfiger Sneaker',     price: 11200, brand: 'Tommy Hilfiger', category: 'unisex', image: '/Tommyhilfiger.png' },
  { id: 4,  name: 'Dr. Martens Boot',           price: 13000, brand: 'Dr. Martens',    category: 'men',    image: '/Martins.png' },
  { id: 5,  name: 'Milano Sport',               price: 8500,  brand: 'Milano',         category: 'women',  image: '/Milano.png' },
  { id: 6,  name: 'Tommy Hilfiger Classic',     price: 10500, brand: 'Tommy Hilfiger', category: 'unisex', image: '/Tommyhilfiger.png' },
  { id: 7,  name: 'Dr. Martens Low',            price: 11800, brand: 'Dr. Martens',    category: 'men',    image: '/Martins.png' },
  { id: 8,  name: 'Milano Elite',               price: 9200,  brand: 'Milano',         category: 'women',  image: '/Milano.png' },
  { id: 9,  name: 'Tommy Hilfiger Runner',      price: 10800, brand: 'Tommy Hilfiger', category: 'unisex', image: '/Tommyhilfiger.png' },
  { id: 10, name: 'Dr. Martens Chelsea',        price: 14000, brand: 'Dr. Martens',    category: 'women',  image: '/Martins.png' },
  { id: 11, name: 'Milano Casual',              price: 7800,  brand: 'Milano',         category: 'men',    image: '/Milano.png' },
  { id: 12, name: 'Tommy Hilfiger Polo Shoe',   price: 12000, brand: 'Tommy Hilfiger', category: 'men',    image: '/Tommyhilfiger.png' },
  { id: 13, name: 'Dr. Martens Oxford',         price: 13500, brand: 'Dr. Martens',    category: 'unisex', image: '/Martins.png' },
  { id: 14, name: 'Milano Wedge',               price: 9500,  brand: 'Milano',         category: 'women',  image: '/Milano.png' },
  { id: 15, name: 'Tommy Hilfiger Loafer',      price: 11500, brand: 'Tommy Hilfiger', category: 'men',    image: '/Tommyhilfiger.png' },
  { id: 16, name: 'Dr. Martens Platform',       price: 15000, brand: 'Dr. Martens',    category: 'women',  image: '/Martins.png' },
  { id: 17, name: 'Milano Slip-On',             price: 8000,  brand: 'Milano',         category: 'unisex', image: '/Milano.png' },
  { id: 18, name: 'Tommy Hilfiger High Top',    price: 13200, brand: 'Tommy Hilfiger', category: 'unisex', image: '/Tommyhilfiger.png' },
  { id: 19, name: 'Dr. Martens Sandal',         price: 10000, brand: 'Dr. Martens',    category: 'women',  image: '/Martins.png' },
  { id: 20, name: 'Milano Derby',               price: 9000,  brand: 'Milano',         category: 'men',    image: '/Milano.png' },
  { id: 21, name: 'Tommy Hilfiger Boat Shoe',   price: 11000, brand: 'Tommy Hilfiger', category: 'men',    image: '/Tommyhilfiger.png' },
  { id: 22, name: 'Dr. Martens Brogue',         price: 12800, brand: 'Dr. Martens',    category: 'unisex', image: '/Martins.png' },
  { id: 23, name: 'Milano Mule',                price: 7500,  brand: 'Milano',         category: 'women',  image: '/Milano.png' },
  { id: 24, name: 'Tommy Hilfiger Canvas',      price: 9800,  brand: 'Tommy Hilfiger', category: 'unisex', image: '/Tommyhilfiger.png' },
  { id: 25, name: 'Dr. Martens Ankle Boot',     price: 13800, brand: 'Dr. Martens',    category: 'women',  image: '/Martins.png' },
  { id: 26, name: 'Milano Trainer',             price: 8800,  brand: 'Milano',         category: 'men',    image: '/Milano.png' },
  { id: 27, name: 'Tommy Hilfiger Espadrille',  price: 10200, brand: 'Tommy Hilfiger', category: 'women',  image: '/Tommyhilfiger.png' },
  { id: 28, name: 'Dr. Martens Lace Up',        price: 12200, brand: 'Dr. Martens',    category: 'men',    image: '/Martins.png' },
  { id: 29, name: 'Milano Pump',                price: 9100,  brand: 'Milano',         category: 'women',  image: '/Milano.png' },
  { id: 30, name: 'Tommy Hilfiger Moccasin',    price: 10900, brand: 'Tommy Hilfiger', category: 'men',    image: '/Tommyhilfiger.png' },
  { id: 31, name: 'Dr. Martens Zip Boot',       price: 14500, brand: 'Dr. Martens',    category: 'unisex', image: '/Martins.png' },
  { id: 32, name: 'Milano Flat',                price: 7200,  brand: 'Milano',         category: 'women',  image: '/Milano.png' },
  { id: 33, name: 'Tommy Hilfiger Flip Flop',   price: 5500,  brand: 'Tommy Hilfiger', category: 'unisex', image: '/Tommyhilfiger.png' },
  { id: 34, name: 'Dr. Martens Monk Strap',     price: 13200, brand: 'Dr. Martens',    category: 'men',    image: '/Martins.png' },
  { id: 35, name: 'Milano Kitten Heel',         price: 9400,  brand: 'Milano',         category: 'women',  image: '/Milano.png' },
  { id: 36, name: 'Tommy Hilfiger Wedge',       price: 11800, brand: 'Tommy Hilfiger', category: 'women',  image: '/Tommyhilfiger.png' },
  { id: 37, name: 'Dr. Martens Creeper',        price: 15500, brand: 'Dr. Martens',    category: 'unisex', image: '/Martins.png' },
  { id: 38, name: 'Milano Block Heel',          price: 9700,  brand: 'Milano',         category: 'women',  image: '/Milano.png' },
  { id: 39, name: 'Tommy Hilfiger Slip On',     price: 10400, brand: 'Tommy Hilfiger', category: 'unisex', image: '/Tommyhilfiger.png' },
  { id: 40, name: 'Dr. Martens Quad Boot',      price: 16000, brand: 'Dr. Martens',    category: 'men',    image: '/Martins.png' },
]

const brands = ['Dr. Martens', 'Milano', 'Tommy Hilfiger']
const categories = ['men', 'women', 'unisex']
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under KES 8,000', min: 0, max: 8000 },
  { label: 'KES 8,000 – 12,000', min: 8000, max: 12000 },
  { label: 'Above KES 12,000', min: 12000, max: Infinity },
]

export default function Products() {
  const { category: urlCategory } = useParams()

  const [selectedCategory, setSelectedCategory] = useState(urlCategory || '')
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setSelectedCategory(urlCategory || '')
    setPage(1)
  }, [urlCategory])

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
    setPage(1)
  }

  const filtered = useMemo(() => {
    const { min, max } = priceRanges[selectedPrice]
    return allShoes.filter((shoe) => {
      const matchCat = selectedCategory ? shoe.category === selectedCategory : true
      const matchBrand = selectedBrands.length ? selectedBrands.includes(shoe.brand) : true
      const matchPrice = shoe.price >= min && shoe.price <= max
      return matchCat && matchBrand && matchPrice
    })
  }, [selectedCategory, selectedBrands, selectedPrice])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleOrder = (shoe) => {
    const msg = `Hi, I'd like to order *${shoe.name}* — KES ${shoe.price.toLocaleString()}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-12">
      <h1 className="text-white text-4xl font-bold text-center mb-10 tracking-wide">Collections</h1>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

        {/* Filters Sidebar */}
        <aside className="w-full md:w-60 flex-shrink-0 flex flex-col gap-8">

          {/* Category */}
          <div>
            <h3 className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-3">Category</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <button
                  onClick={() => { setSelectedCategory(''); setPage(1) }}
                  className={`text-sm w-full text-left px-3 py-2 rounded transition-colors ${selectedCategory === '' ? 'bg-yellow-400 text-black font-semibold' : 'text-white/70 hover:text-white'}`}
                >
                  All
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => { setSelectedCategory(cat); setPage(1) }}
                    className={`text-sm w-full text-left px-3 py-2 rounded capitalize transition-colors ${selectedCategory === cat ? 'bg-yellow-400 text-black font-semibold' : 'text-white/70 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand */}
          <div>
            <h3 className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-3">Brand</h3>
            <ul className="flex flex-col gap-2">
              {brands.map((brand) => (
                <li key={brand} className="flex items-center gap-2 cursor-pointer" onClick={() => toggleBrand(brand)}>
                  <div className={`w-4 h-4 rounded border-2 flex-shrink-0 transition-colors ${selectedBrands.includes(brand) ? 'bg-yellow-400 border-yellow-400' : 'border-white/40'}`} />
                  <span className="text-white/70 text-sm hover:text-white transition-colors">{brand}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-3">Price Range</h3>
            <ul className="flex flex-col gap-2">
              {priceRanges.map((range, i) => (
                <li key={range.label}>
                  <button
                    onClick={() => { setSelectedPrice(i); setPage(1) }}
                    className={`text-sm w-full text-left px-3 py-2 rounded transition-colors ${selectedPrice === i ? 'bg-yellow-400 text-black font-semibold' : 'text-white/70 hover:text-white'}`}
                  >
                    {range.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Reset */}
          <button
            onClick={() => { setSelectedCategory(''); setSelectedBrands([]); setSelectedPrice(0); setPage(1) }}
            className="text-xs text-white/40 hover:text-yellow-400 transition-colors text-left"
          >
            Reset Filters
          </button>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {paginated.length === 0 ? (
            <p className="text-white/50 text-center mt-20">No shoes match your filters.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginated.map((shoe) => (
                <div key={shoe.id} className="bg-neutral-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img src={shoe.image} alt={shoe.name} className="w-full h-56 object-cover" />
                  <div className="p-4">
                    <p className="text-white/50 text-xs capitalize mb-1">{shoe.category}</p>
                    <p className="text-white font-semibold text-sm">{shoe.name}</p>
                    <p className="text-yellow-400 mt-1 text-sm mb-3">KES {shoe.price.toLocaleString()}</p>
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
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm text-white border border-white/20 rounded hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Prev
              </button>
              <span className="text-white/60 text-sm">{page} of {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm text-white border border-white/20 rounded hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
