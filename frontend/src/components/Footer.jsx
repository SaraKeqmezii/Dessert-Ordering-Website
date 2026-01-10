import { Link } from 'react-router-dom'
import { FaBirthdayCake, FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaClock, FaAngleRight } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-dark to-secondary text-accent pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaBirthdayCake className="text-primary text-2xl" />
              <span className="font-display text-xl font-bold">Ëmbëlsira</span>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Krijojmë ëmbëlsira të shijshme dhe të personalizuara për çdo rast special. Me dashuri dhe pasion që nga viti 2020.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          
          <div>
            <h5 className="text-primary font-semibold text-lg mb-4">Lidhje të Shpejta</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <FaAngleRight /> Kryefaqja
                </Link>
              </li>
              <li>
                <Link to="/products" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <FaAngleRight /> Produktet
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <FaAngleRight /> Rreth Nesh
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <FaAngleRight /> Kontakt
                </Link>
              </li>
            </ul>
          </div>

          
          <div>
            <h5 className="text-primary font-semibold text-lg mb-4">Kategoritë</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=torta" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <FaAngleRight /> Torta
                </Link>
              </li>
              <li>
                <Link to="/products?category=cupcakes" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <FaAngleRight /> Cupcakes
                </Link>
              </li>
              <li>
                <Link to="/products?category=biskota" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <FaAngleRight /> Biskota
                </Link>
              </li>
              <li>
                <Link to="/products?category=tradicionale" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <FaAngleRight /> Tradicionale
                </Link>
              </li>
            </ul>
          </div>

          
          <div>
            <h5 className="text-primary font-semibold text-lg mb-4">Kontakt</h5>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-primary" />
                <span>Rruga Nëna Terezë, Nr. 10<br />Prishtinë, Kosovë</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-primary" />
                <span>+383 44 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <FaClock className="text-primary" />
                <span>E Hënë - E Shtunë: 08:00 - 20:00</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-white/10 mb-6" />
        
        <div className="text-center text-sm opacity-70">
          <p>&copy; 2026 Ëmbëlsira. Të gjitha të drejtat e rezervuara.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
