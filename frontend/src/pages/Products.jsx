import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaBirthdayCake, FaCookie, FaHeart, FaThLarge } from 'react-icons/fa'
import { GiCupcake } from 'react-icons/gi'
import ProductCard from '../components/ProductCard'

const allProducts = [
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

const categories = [
  { id: 'all', name: 'Të Gjitha', icon: FaThLarge },
  { id: 'torta', name: 'Torta', icon: FaBirthdayCake },
  { id: 'cupcakes', name: 'Cupcakes', icon: GiCupcake },
  { id: 'biskota', name: 'Biskota', icon: FaCookie },
  { id: 'tradicionale', name: 'Tradicionale', icon: FaHeart }
]

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [products, setProducts] = useState(allProducts)

  useEffect(() => {
    const category = searchParams.get('category') || 'all'
    setSelectedCategory(category)
    
    if (category === 'all') {
      setProducts(allProducts)
    } else {
      setProducts(allProducts.filter(p => p.category === category))
    }
  }, [searchParams])

  const handleCategoryChange = (categoryId) => {
    setSearchParams({ category: categoryId })
  }

  return (
    <div>
      
      <div className="bg-gradient-to-r from-secondary to-dark py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <FaCookie className="inline-block mr-3" />
            Produktet Tona
          </h1>
          <p className="text-lg opacity-90">Zbuloni koleksionin tonë të ëmbëlsirave të shijshme</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
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

        
        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FaCookie className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-500 mb-2">Nuk u gjetën produkte</h3>
            <p className="text-gray-400">Provoni një kategori tjetër</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
