import { Link } from 'react-router-dom'
import { FaShoppingCart, FaTrash, FaMinus, FaPlus, FaArrowLeft, FaCreditCard, FaShieldAlt, FaUndo, FaShoppingBag } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

function Cart() {
  const { cart, total, updateQuantity, removeFromCart } = useCart()
  const deliveryFee = total >= 20 ? 0 : 2
  const finalTotal = total + deliveryFee

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <FaShoppingCart className="text-8xl text-gray-300 mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold mb-4">Shporta juaj është bosh</h2>
          <p className="text-gray-500 mb-8">Shfleto produktet tona të shijshme dhe shto diçka në shportë!</p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            <FaShoppingBag /> Shiko Produktet
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      
      <div className="bg-gradient-to-r from-secondary to-dark py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <FaShoppingCart className="inline-block mr-3" />
            Shporta Juaj
          </h1>
          <p className="text-lg opacity-90">Rishikoni produktet e zgjedhura përpara se të porositni</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              
              <div className="bg-accent p-4 grid grid-cols-12 gap-4 font-semibold text-dark">
                <div className="col-span-6">Produkti</div>
                <div className="col-span-2 text-center">Çmimi</div>
                <div className="col-span-2 text-center">Sasia</div>
                <div className="col-span-2 text-center">Totali</div>
              </div>

              
              {cart.map(item => (
                <div key={item.id} className="p-4 border-b border-gray-100 grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-sm flex items-center gap-1 mt-1 hover:text-red-700"
                      >
                        <FaTrash /> Hiq
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">€{item.price}</div>
                  <div className="col-span-2 flex justify-center items-center gap-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center text-sm"
                    >
                      <FaMinus />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center text-sm"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div className="col-span-2 text-center font-bold text-secondary">
                    €{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Link to="/products" className="btn-outline inline-flex items-center gap-2">
                <FaArrowLeft /> Vazhdoni Blerjen
              </Link>
            </div>
          </div>

          
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="font-display text-2xl font-bold mb-6">Përmbledhja</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Nëntotali:</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Dërgimi:</span>
                  <span className={deliveryFee === 0 ? 'text-green-500 font-semibold' : ''}>
                    {deliveryFee === 0 ? 'FALAS' : `€${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {total < 20 && (
                  <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm">
                    <strong>Këshillë:</strong> Shtoni edhe €{(20 - total).toFixed(2)} për dërgim falas!
                  </div>
                )}
              </div>

              <hr className="mb-6" />

              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Totali:</span>
                <span className="text-secondary">€{finalTotal.toFixed(2)}</span>
              </div>

              <Link 
                to="/checkout" 
                className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
              >
                <FaCreditCard /> Vazhdo me Porosinë
              </Link>

              
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <FaShieldAlt className="text-2xl text-primary" />
                  <div>
                    <p className="font-semibold text-sm">Porosi e Sigurt</p>
                    <p className="text-xs">Të dhënat tuaja janë të mbrojtura</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FaUndo className="text-2xl text-primary" />
                  <div>
                    <p className="font-semibold text-sm">Garanci Kthimi</p>
                    <p className="text-xs">Nëse nuk jeni të kënaqur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
