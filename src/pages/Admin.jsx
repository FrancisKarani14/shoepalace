import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { FaBox, FaChartBar, FaUsers, FaPlus, FaEdit, FaTrash, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa'

const SECTIONS = ['overview', 'products', 'subscribers']

const emptyForm = { name: '', price: '', brand: '', category: 'men', stock: '', image_url: '', is_trending: false, is_latest: false }

export default function Admin() {
  const navigate = useNavigate()
  const [active, setActive] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => { fetchProducts() }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }

  const openAdd = () => { setForm(emptyForm); setEditId(null); setImageFile(null); setError(''); setShowModal(true) }
  const openEdit = (p) => { setForm({ name: p.name, price: p.price, brand: p.brand, category: p.category, stock: p.stock, image_url: p.image_url, is_trending: p.is_trending || false, is_latest: p.is_latest || false }); setEditId(p.id); setImageFile(null); setError(''); setShowModal(true) }
  const closeModal = () => { setShowModal(false); setError('') }

  const uploadImage = async () => {
    if (!imageFile) return form.image_url
    const ext = imageFile.name.split('.').pop()
    const path = `${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('products').upload(path, imageFile, { upsert: true })
    if (error) throw error
    const { data } = supabase.storage.from('products').getPublicUrl(path)
    return data.publicUrl
  }

  const handleSave = async () => {
    if (!form.name || !form.price || !form.brand || !form.stock) { setError('Please fill in all fields.'); return }
    setSaving(true)
    setError('')
    try {
      const image_url = await uploadImage()
      const payload = { name: form.name, price: Number(form.price), brand: form.brand, category: form.category, stock: Number(form.stock), image_url, is_trending: form.is_trending, is_latest: form.is_latest }
      if (editId) {
        await supabase.from('products').update(payload).eq('id', editId)
      } else {
        await supabase.from('products').insert(payload)
      }
      await fetchProducts()
      closeModal()
    } catch (e) {
      setError(e.message || 'Something went wrong.')
    }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    await supabase.from('products').delete().eq('id', id)
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const total = products.length
  const totalMen = products.filter(p => p.category === 'men').length
  const totalWomen = products.filter(p => p.category === 'women').length
  const totalUnisex = products.filter(p => p.category === 'unisex').length

  const navItems = [
    { key: 'overview', label: 'Overview', icon: FaChartBar },
    { key: 'products', label: 'Products', icon: FaBox },
    { key: 'subscribers', label: 'Subscribers', icon: FaUsers },
  ]

  return (
    <div className="min-h-screen bg-neutral-950 flex">

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-60 bg-neutral-900 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex`}>
        <div className="p-6 border-b border-white/10">
          <img src="/LOGO.png" alt="Shoe Palace" className="h-10 object-contain cursor-pointer" onClick={() => navigate('/')} />
          <p className="text-white/40 text-xs mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setActive(key); setSidebarOpen(false) }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full text-left ${active === key ? 'bg-yellow-400 text-black' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              <Icon /> {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 w-full transition-colors">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Sidebar overlay on mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="bg-neutral-900 border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <button className="md:hidden text-white text-xl" onClick={() => setSidebarOpen(true)}>
            <FaBars />
          </button>
          <h1 className="text-white font-bold text-lg capitalize">{active}</h1>
          <span className="text-white/40 text-sm">Shoe Palace Admin</span>
        </header>

        <main className="flex-1 p-6">

          {/* Overview */}
          {active === 'overview' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Products', value: total, color: 'bg-yellow-400' },
                { label: 'Men', value: totalMen, color: 'bg-blue-500' },
                { label: 'Women', value: totalWomen, color: 'bg-pink-500' },
                { label: 'Unisex', value: totalUnisex, color: 'bg-green-500' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-neutral-900 rounded-xl p-6 flex flex-col gap-2">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  <p className="text-white text-3xl font-bold">{value}</p>
                  <p className="text-white/50 text-sm">{label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Products */}
          {active === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-white/50 text-sm">{total} products total</p>
                <button onClick={openAdd} className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer">
                  <FaPlus /> Add Product
                </button>
              </div>

              {loading ? (
                <p className="text-white/40 text-center mt-20">Loading...</p>
              ) : (
                <div className="overflow-x-auto rounded-xl">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-neutral-800 text-white/50 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3">Image</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Brand</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Stock</th>
                        <th className="px-4 py-3">Tags</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} className="border-t border-white/5 bg-neutral-900 hover:bg-neutral-800 transition-colors">
                          <td className="px-4 py-3">
                            <img src={p.image_url} alt={p.name} className="w-12 h-12 object-cover rounded-lg" />
                          </td>
                          <td className="px-4 py-3 text-white font-medium">{p.name}</td>
                          <td className="px-4 py-3 text-white/60">{p.brand}</td>
                          <td className="px-4 py-3 capitalize text-white/60">{p.category}</td>
                          <td className="px-4 py-3 text-yellow-400">KES {Number(p.price).toLocaleString()}</td>
                          <td className="px-4 py-3 text-white/60">{p.stock}</td>
                          <td className="px-4 py-3 flex gap-1 flex-wrap">
                            {p.is_trending && <span className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full font-semibold">Trending</span>}
                            {p.is_latest && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-semibold">Latest</span>}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button onClick={() => openEdit(p)} className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors cursor-pointer">
                                <FaEdit />
                              </button>
                              <button onClick={() => handleDelete(p.id)} className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors cursor-pointer">
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Subscribers */}
          {active === 'subscribers' && (
            <div className="flex items-center justify-center mt-20">
              <p className="text-white/40 text-lg">Subscribers coming soon.</p>
            </div>
          )}

        </main>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-neutral-900 rounded-2xl w-full max-w-md p-6 relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-white/40 hover:text-white">
              <FaTimes />
            </button>
            <h2 className="text-white font-bold text-lg mb-6">{editId ? 'Edit Product' : 'Add Product'}</h2>

            <div className="flex flex-col gap-4">
              {error && <p className="text-red-400 text-sm">{error}</p>}

              {[
                { label: 'Name', key: 'name', type: 'text' },
                { label: 'Brand', key: 'brand', type: 'text' },
                { label: 'Price (KES)', key: 'price', type: 'number' },
                { label: 'Stock', key: 'stock', type: 'number' },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="text-white/50 text-xs uppercase tracking-widest mb-1 block">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                    className="w-full bg-neutral-800 text-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              ))}

              <div>
                <label className="text-white/50 text-xs uppercase tracking-widest mb-1 block">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-neutral-800 text-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-white/50 text-xs uppercase tracking-widest block">Display Section</label>
                {[{ key: 'is_trending', label: 'Trending' }, { key: 'is_latest', label: 'Latest' }].map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, [key]: !prev[key] }))}
                    className={`flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-colors ${form[key] ? 'bg-yellow-400 text-black' : 'bg-neutral-800 text-white/60 hover:text-white'}`}
                  >
                    {label}
                    <span className={`w-4 h-4 rounded-full border-2 ${form[key] ? 'bg-black border-black' : 'border-white/40'}`} />
                  </button>
                ))}
              </div>

              <div>
                <label className="text-white/50 text-xs uppercase tracking-widest mb-1 block">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full bg-neutral-800 text-white/60 rounded-lg px-4 py-2 text-sm outline-none file:mr-3 file:bg-yellow-400 file:text-black file:border-0 file:rounded file:px-3 file:py-1 file:text-xs file:font-semibold cursor-pointer"
                />
                {form.image_url && !imageFile && (
                  <img src={form.image_url} alt="current" className="mt-2 h-16 w-16 object-cover rounded-lg" />
                )}
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50 mt-2"
              >
                {saving ? 'Saving...' : editId ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
