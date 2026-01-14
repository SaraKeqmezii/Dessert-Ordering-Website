import { Link } from 'react-router-dom'
import { FaShoppingBag, FaPhone, FaTruck, FaLeaf, FaPaintBrush, FaArrowRight } from 'react-icons/fa'
import ProductCard from '../components/ProductCard'

const featuredProducts = [
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
    id: 5,
    name: "Cupcakes",
    description: "Cupcakes me krem të ndryshëm - 6 copë",
    price: 12,
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400",
    category: "cupcakes"
  },
  {
    id: 3,
    name: "Bakllavë",
    description: "Bakllavë tradicionale me arra dhe mjaltë",
    price: 8,
    image: "https://images.unsplash.com/photo-1598110750624-207050c4f28c?w=400",
    category: "tradicionale"
  }
]

function Home() {
  return (
    <div>
      <section 
        className="relative min-h-[600px] flex items-center justify-center text-center text-white"
        style={{
          background: 'linear-gradient(rgba(62, 39, 35, 0.75), rgba(93, 64, 55, 0.7)), url(https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Ëmbëlsira të Shijshme<br />për Çdo Rast
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Porositni torta, cupcakes dhe ëmbëlsira tradicionale të bëra me dashuri dhe përbërës të freskët. Dërgim falas në të gjithë Prishtinën!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-primary text-lg flex items-center justify-center gap-2">
              <FaShoppingBag /> Shiko Produktet
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-dark transition-all flex items-center justify-center gap-2">
              <FaPhone /> Na Kontaktoni
            </Link>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-light hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTruck className="text-3xl text-primary" />
              </div>
              <h4 className="font-display text-xl font-semibold mb-2">Dërgim Falas</h4>
              <p className="text-gray-500">Dërgim falas për porosi mbi €20 në të gjithë Prishtinën</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-light hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-3xl text-primary" />
              </div>
              <h4 className="font-display text-xl font-semibold mb-2">Përbërës Freskët</h4>
              <p className="text-gray-500">Përdorim vetëm përbërës të freskët dhe cilësorë</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-light hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPaintBrush className="text-3xl text-primary" />
              </div>
              <h4 className="font-display text-xl font-semibold mb-2">Dizajn të Personalizuar</h4>
              <p className="text-gray-500">Krijojmë torta sipas dëshirës suaj</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="section-title">
            <h2>Produktet Tona të Veçanta</h2>
            <div className="divider"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/products" className="btn-primary text-lg inline-flex items-center gap-2">
              Shiko të Gjitha Produktet <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl font-bold mb-4">Keni një Rast Special?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Na kontaktoni për porosi të personalizuara. Krijojmë torta unike për dasma, ditëlindje dhe çdo festë tjetër!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-dark px-8 py-3 rounded-full font-semibold hover:bg-accent transition-colors inline-flex items-center justify-center gap-2">
              <FaPhone /> Na Telefononi
            </Link>
            <Link to="/products" className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-dark transition-colors inline-flex items-center justify-center gap-2">
              <FaShoppingBag /> Porosit Tani
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
