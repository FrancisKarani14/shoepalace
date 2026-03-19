import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { allShoes } from '../data/shoes'

const PER_PAGE = 12
const brands = ['Dr. Martens', 'Santoni Milano', 'Tommy Hilfiger', 'Polo', 'Jordan', 'Timberland', 'Nike', 'Clog', 'New Balance']
const categories = ['men', 'women', 'unisex']
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under KES 2,500', min: 0, max: 2500 },
  { label: 'KES 2,500 – 3,000', min: 2500, max: 3000 },
  { label: 'Above KES 3,000', min: 3000, max: Infinity },
]

function FilterSection({ title, open, onToggle, children }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full text-yellow-400 font-bold text-sm uppercase tracking-widest mb-2"
      >
        {title} <span className="text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  )
}

export default function Products() {
  const { category: urlCategory } = useParams()
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = useState(urlCategory || '')
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sections, setSections] = useState({ category: true, brand: true, price: true })

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

  const toggleSection = (key) => setSections(prev => ({ ...prev, [key]: !prev[key] }))

  const resetFilters = () => { setSelectedCategory(''); setSelectedBrands([]); setSelectedPrice(0); setPage(1) }

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

  const sidebar = (
    <aside className="w-full md:w-60 flex-shrink-0 flex flex-col gap-6">
      <FilterSection title="Category" open={sections.category} onToggle={() => toggleSection('category')}>
        <ul className="flex flex-col gap-2">
          <li>
            <button onClick={() => { setSelectedCategory(''); setPage(1) }}
              className={`text-sm w-full text-left px-3 py-2 rounded transition-colors ${selectedCategory === '' ? 'bg-yellow-400 text-black font-semibold' : 'text-white/70 hover:text-white'}`}>
              All
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button onClick={() => { setSelectedCategory(cat); setPage(1) }}
                className={`text-sm w-full text-left px-3 py-2 rounded capitalize transition-colors ${selectedCategory === cat ? 'bg-yellow-400 text-black font-semibold' : 'text-white/70 hover:text-white'}`}>
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Brand" open={sections.brand} onToggle={() => toggleSection('brand')}>
        <ul className="flex flex-col gap-2">
          {brands.map((brand) => (
            <li key={brand} className="flex items-center gap-2 cursor-pointer" onClick={() => toggleBrand(brand)}>
              <div className={`w-4 h-4 rounded border-2 flex-shrink-0 transition-colors ${selectedBrands.includes(brand) ? 'bg-yellow-400 border-yellow-400' : 'border-white/40'}`} />
              <span className="text-white/70 text-sm hover:text-white transition-colors">{brand}</span>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Price Range" open={sections.price} onToggle={() => toggleSection('price')}>
        <ul className="flex flex-col gap-2">
          {priceRanges.map((range, i) => (
            <li key={range.label}>
              <button onClick={() => { setSelectedPrice(i); setPage(1) }}
                className={`text-sm w-full text-left px-3 py-2 rounded transition-colors ${selectedPrice === i ? 'bg-yellow-400 text-black font-semibold' : 'text-white/70 hover:text-white'}`}>
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      <button onClick={resetFilters} className="text-xs text-white/40 hover:text-yellow-400 transition-colors text-left">
        Reset Filters
      </button>
    </aside>
  )

  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-12">
      <h1 className="text-white text-4xl font-bold text-center mb-10 tracking-wide">Collections</h1>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

        {/* Mobile filter toggle */}
        <div className="md:hidden flex justify-between items-center mb-2">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 text-yellow-400 border border-yellow-400 px-4 py-2 rounded text-sm font-semibold"
          >
            {filtersOpen ? 'Hide Filters ▲' : 'Show Filters ▼'}
          </button>
          <button onClick={resetFilters} className="text-xs text-white/40 hover:text-yellow-400 transition-colors">
            Reset
          </button>
        </div>

        {/* Sidebar — always visible on md+, toggle on mobile */}
        <div className={`${filtersOpen ? 'block' : 'hidden'} md:block`}>
          {sidebar}
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {paginated.length === 0 ? (
            <p className="text-white/50 text-center mt-20">No shoes match your filters.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginated.map((shoe) => (
                <div key={shoe.id} className="bg-neutral-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img src={shoe.image} alt={shoe.name} className="w-full h-56 md:h-56 aspect-square md:aspect-auto object-cover" />
                  <div className="p-4">
                    <p className="text-white/50 text-xs capitalize mb-1">{shoe.category}</p>
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
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="px-4 py-2 text-sm text-white border border-white/20 rounded hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                Prev
              </button>
              <span className="text-white/60 text-sm">{page} of {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-4 py-2 text-sm text-white border border-white/20 rounded hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
