import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBirthdayCake, FaShoppingCart, FaBars, FaTimes, FaHome, FaCookieBite, FaInfoCircle, FaEnvelope } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { cartCount } = useCart()

  return (
    <nav className="bg-gradient-to-r from-secondary to-dark sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          <Link to="/" className="flex items-center space-x-2">
            <FaBirthdayCake className="text-primary text-3xl" />
            <span className="font-display text-2xl font-bold text-accent">Ëmbëlsira</span>
          </Link>

          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-accent hover:text-primary transition-colors flex items-center gap-2">
              <FaHome /> Kryefaqja
            </Link>
            <Link to="/products" className="text-accent hover:text-primary transition-colors flex items-center gap-2">
              <FaCookieBite /> Produktet
            </Link>
            <Link to="/about" className="text-accent hover:text-primary transition-colors flex items-center gap-2">
              <FaInfoCircle /> Rreth Nesh
            </Link>
            <Link to="/contact" className="text-accent hover:text-primary transition-colors flex items-center gap-2">
              <FaEnvelope /> Kontakt
            </Link>
            <Link to="/cart" className="relative text-accent hover:text-primary transition-colors">
              <FaShoppingCart className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          
          <button 
            className="md:hidden text-accent text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-accent hover:text-primary transition-colors flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <FaHome /> Kryefaqja
              </Link>
              <Link to="/products" className="text-accent hover:text-primary transition-colors flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <FaCookieBite /> Produktet
              </Link>
              <Link to="/about" className="text-accent hover:text-primary transition-colors flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <FaInfoCircle /> Rreth Nesh
              </Link>
              <Link to="/contact" className="text-accent hover:text-primary transition-colors flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <FaEnvelope /> Kontakt
              </Link>
              <Link to="/cart" className="text-accent hover:text-primary transition-colors flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <FaShoppingCart /> Shporta ({cartCount})
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
