import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaPhone, FaCheckCircle, FaTruck, FaClock, FaMapMarkerAlt } from 'react-icons/fa'

const defaultProducts = [
  {
    id: 1,
    name: "Torte Çokollatë",
    description: "Tortë e shijshme me çokollatë belge dhe krem të butë. Bërë me përbërës premium dhe çokollatë belge origjinale. Përshtatshme për 8-10 persona.",
    price: 25,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
    category: "torta"
  },
  {
    id: 2,
    name: "Torte Fruta",
    description: "Tortë me fruta të freskëta stinore dhe krem vanilje. Dekoruar me dredhëza, boronica, kivi dhe mango. Përshtatshme për 8-10 persona.",
    price: 28,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
    category: "torta"
  },
  {
    id: 3,
    name: "Bakllavë",
    description: "Bakllavë tradicionale me arra dhe mjaltë. Recetë autentike familjare që kalon brez pas brezi. Porcion për 6-8 persona.",
    price: 8,
    image: "https://images.unsplash.com/photo-1598110750624-207050c4f28c?w=800",
    category: "tradicionale"
  },
  {
    id: 4,
    name: "Trilece",
    description: "Trilece kremoz me karamel të freskët. Ëmbëlsirë e lehtë dhe e shijshme për çdo rast. Përshtatshme për 4-6 persona.",
    price: 6,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
    category: "tradicionale"
  },
  {
    id: 5,
    name: "Cupcakes",
    description: "Cupcakes me krem të ndryshëm - 6 copë. Shije të disponueshme: vanilje, çokollatë, dredhëz, karamel.",
    price: 12,
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800",
    category: "cupcakes"
  },
  {
    id: 6,
    name: "Makaron",
    description: "Makaron francez me shije të ndryshme - 12 copë. Bërë sipas traditës franceze me bajame të bluar finë.",
    price: 15,
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800",
    category: "biskota"
  },
  {
    id: 7,
    name: "Cheesecake",
    description: "Cheesecake klasik me dredhëza. Krem djathi i butë mbi bazë biskotash me sos dredhëzash të freskëta.",
    price: 22,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800",
    category: "torta"
  },
  {
    id: 8,
    name: "Profiterol",
    description: "Profiterol me krem dhe çokollatë - 8 copë. Shu i mbushur me krem vanilje dhe i mbuluar me çokollatë të zezë.",
    price: 9,
    image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=800",
    category: "tradicionale"
  }
]

const categoryLabels = {
  torta: 'Tortë',
  cupcakes: 'Cupcakes',
  biskota: 'Biskota',
  tradicionale: 'Tradicionale'
}

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedProducts = localStorage.getItem('adminProducts')
    const productsData = savedProducts ? JSON.parse(savedProducts) : defaultProducts
    const foundProduct = productsData.find(p => p.id === parseInt(id))
    setProduct(foundProduct)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Duke ngarkuar...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Produkti nuk u gjet</h2>
        <Link to="/products" className="btn-primary">Kthehu te Produktet</Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm">
          <li><Link to="/" className="text-primary hover:underline">Kryefaqja</Link></li>
          <li className="text-gray-400">/</li>
          <li><Link to="/products" className="text-primary hover:underline">Produktet</Link></li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-500">{product.name}</li>
        </ol>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        
        <div>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full rounded-3xl shadow-xl"
          />
        </div>

        
        <div>
          <span className="inline-block bg-accent text-secondary px-4 py-1 rounded-full text-sm font-medium mb-4">
            {categoryLabels[product.category]}
          </span>
          
          <h1 className="font-display text-4xl font-bold text-dark mb-4">{product.name}</h1>
          
          <div className="text-4xl font-bold text-secondary mb-6">€{product.price}</div>

          <p className="text-gray-600 text-lg mb-8">{product.description}</p>

          
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-primary" />
              <span>Përbërës të freskët dhe natyralë</span>
            </div>
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-primary" />
              <span>Bërë me dorë me dashuri</span>
            </div>
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-primary" />
              <span>Paketim i kujdesshëm</span>
            </div>
          </div>

          
          <a 
            href="tel:044958935"
            className="w-full py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all mb-8"
          >
            <FaPhone /> Porosit Tani
          </a>

          
          <div className="bg-light p-6 rounded-2xl">
            <h5 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FaTruck className="text-primary" /> Informacion Dërgimi
            </h5>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <FaClock className="text-primary" /> Dërgim brenda 24-48 orëve
              </li>
              <li className="flex items-center gap-2">
                <FaTruck className="text-primary" /> Dërgim falas për porosi mbi €20
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" /> Dërgim në Prishtinë dhe rrethe
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
