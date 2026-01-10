import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaImage, FaSave, FaTimes, FaCookie, FaBirthdayCake, FaHeart, FaList } from 'react-icons/fa'
import { GiCupcake } from 'react-icons/gi'

const categories = [
  { id: 'all', name: 'Të Gjitha', icon: FaList },
  { id: 'torta', name: 'Torta', icon: FaBirthdayCake },
  { id: 'cupcakes', name: 'Cupcakes', icon: GiCupcake },
  { id: 'biskota', name: 'Biskota', icon: FaCookie },
  { id: 'tradicionale', name: 'Tradicionale', icon: FaHeart }
]

const defaultProducts = [
  {
    id: 1,
    name: "Torte Çokollatë",
    description: "Tortë e shijshme me çokollatë belge dhe krem të butë",
    price: 25,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    category: "torta"
  },
  {
    id: 2,
    name: "Torte Fruta",
    description: "Tortë me fruta të freskëta stinore dhe krem vanilje",
    price: 28,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400",
    category: "torta"
  },
  {
    id: 3,
    name: "Bakllavë",
    description: "Bakllavë tradicionale me arra dhe mjaltë",
    price: 8,
    image: "https://images.unsplash.com/photo-1598110750624-207050c4f28c?w=400",
    category: "tradicionale"
  },
  {
    id: 4,
    name: "Trilece",
    description: "Trilece kremoz me karamel të freskët",
    price: 6,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
    category: "tradicionale"
  },
  {
    id: 5,
    name: "Cupcakes",
    description: "Cupcakes me krem të ndryshëm - 6 copë",
    price: 12,
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400",
    category: "cupcakes"
  },
  {
    id: 6,
    name: "Makaron",
    description: "Makaron francez me shije të ndryshme - 12 copë",
    price: 15,
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400",
    category: "biskota"
  },
  {
    id: 7,
    name: "Cheesecake",
    description: "Cheesecake klasik me dredhëza",
    price: 22,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400",
    category: "torta"
  },
  {
    id: 8,
    name: "Profiterol",
    description: "Profiterol me krem dhe çokollatë - 8 copë",
    price: 9,
    image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=400",
    category: "tradicionale"
  }
]

function Admin() {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'torta'
  })
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    const savedProducts = localStorage.getItem('adminProducts')
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      setProducts(defaultProducts)
      localStorage.setItem('adminProducts', JSON.stringify(defaultProducts))
    }
  }, [])

  const saveProducts = (newProducts) => {
    setProducts(newProducts)
    localStorage.setItem('adminProducts', JSON.stringify(newProducts))
  }

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image: product.image,
        category: product.category
      })
      setImagePreview(product.image)
    } else {
      setEditingProduct(null)
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        category: 'torta'
      })
      setImagePreview('')
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
    setFormData({ name: '', description: '', price: '', image: '', category: 'torta' })
    setImagePreview('')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (name === 'image') {
      setImagePreview(value)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }))
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.price || !formData.image) {
      alert('Ju lutem plotësoni të gjitha fushat e detyrueshme!')
      return
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      id: editingProduct ? editingProduct.id : Date.now()
    }

    let newProducts
    if (editingProduct) {
      newProducts = products.map(p => p.id === editingProduct.id ? productData : p)
    } else {
      newProducts = [...products, productData]
    }

    saveProducts(newProducts)
    closeModal()
  }

  const deleteProduct = (id) => {
    if (window.confirm('A jeni të sigurt që dëshironi të fshini këtë produkt?')) {
      const newProducts = products.filter(p => p.id !== id)
      saveProducts(newProducts)
    }
  }

  const getCategoryLabel = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId)
    return cat ? cat.name : categoryId
  }

  return (
    <div className="min-h-screen bg-light">
      <div className="bg-gradient-to-r from-secondary to-dark py-8 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            <FaCookie className="inline-block mr-3" />
            Panel Administrimi
          </h1>
          <p className="opacity-90">Menaxhoni produktet dhe kategoritë</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                      : 'bg-white text-dark border-2 border-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  <Icon /> {category.name}
                </button>
              )
            })}
          </div>
          
          <button
            onClick={() => openModal()}
            className="btn-primary flex items-center gap-2"
          >
            <FaPlus /> Shto Produkt të Ri
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Foto</th>
                  <th className="px-6 py-4 text-left font-semibold">Emri</th>
                  <th className="px-6 py-4 text-left font-semibold">Kategoria</th>
                  <th className="px-6 py-4 text-left font-semibold">Çmimi</th>
                  <th className="px-6 py-4 text-center font-semibold">Veprime</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-light transition-colors">
                    <td className="px-6 py-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-accent text-secondary px-3 py-1 rounded-full text-sm font-medium">
                        {getCategoryLabel(product.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-secondary">€{product.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openModal(product)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Ndrysho"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          title="Fshi"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <FaCookie className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Nuk ka produkte në këtë kategori</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-gray-500">
          Gjithsej: <strong>{products.length}</strong> produkte
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white rounded-t-2xl">
              <h2 className="font-display text-2xl font-bold flex items-center gap-2">
                {editingProduct ? <FaEdit /> : <FaPlus />}
                {editingProduct ? 'Ndrysho Produktin' : 'Shto Produkt të Ri'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block font-medium mb-2">Emri i Produktit *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
                  placeholder="P.sh. Torte Çokollatë"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Përshkrimi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
                  placeholder="Përshkrimi i produktit..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">Çmimi (€) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Kategoria *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
                    required
                  >
                    {categories.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2">Foto e Produktit *</label>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Ngarko foto:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
                    />
                  </div>
                  
                  <div className="text-center text-gray-400 text-sm">ose</div>
                  
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">URL e fotos:</label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Parashikim:</p>
                    <img 
                      src={imagePreview} 
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <FaTimes /> Anulo
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <FaSave /> {editingProduct ? 'Ruaj Ndryshimet' : 'Shto Produktin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
