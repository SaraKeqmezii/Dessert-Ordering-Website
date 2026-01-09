import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCreditCard, FaUser, FaTruck, FaWallet, FaMoneyBillWave, FaUniversity, FaLock, FaPhone, FaShoppingBag } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

function Checkout() {
  const navigate = useNavigate()
  const { cart, total, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    delivery_date: '',
    notes: '',
    payment: 'cash'
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const deliveryFee = total >= 20 ? 0 : 2
  const finalTotal = total + deliveryFee

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Emri është i detyrueshëm'
    if (!formData.email.trim()) newErrors.email = 'Email është i detyrueshëm'
    if (!formData.phone.trim()) newErrors.phone = 'Telefoni është i detyrueshëm'
    if (!formData.address.trim()) newErrors.address = 'Adresa është e detyrueshme'
    if (!formData.delivery_date) newErrors.delivery_date = 'Data e dërgimit është e detyrueshme'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    const orderId = Date.now()
    
    const order = {
      id: orderId,
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      },
      items: cart,
      total: finalTotal,
      delivery_date: formData.delivery_date,
      notes: formData.notes,
      payment: formData.payment,
      status: 'pending',
      created_at: new Date().toISOString()
    }

    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(order)
    localStorage.setItem('orders', JSON.stringify(orders))

    clearCart()
    navigate(`/order-confirmation/${orderId}`)
  }

  if (cart.length === 0) {
    navigate('/products')
    return null
  }

  return (
    <div>
      
      <div className="bg-gradient-to-r from-secondary to-dark py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <FaCreditCard className="inline-block mr-3" />
            Përfundo Porosinë
          </h1>
          <p className="text-lg opacity-90">Plotësoni të dhënat për të përfunduar porosinë tuaj</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                  <FaUser className="text-primary" /> Të Dhënat e Klientit
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-2">Emri dhe Mbiemri *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-primary focus:outline-none transition-colors`}
                      placeholder="P.sh. Arta Hoxha"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Numri i Telefonit *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-primary focus:outline-none transition-colors`}
                      placeholder="P.sh. +383 44 123 456"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-primary focus:outline-none transition-colors`}
                    placeholder="P.sh. arta@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mt-4">
                  <label className="block font-medium mb-2">Adresa e Plotë *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.address ? 'border-red-500' : 'border-gray-200'} focus:border-primary focus:outline-none transition-colors`}
                    placeholder="P.sh. Rruga Nëna Terezë, Nr. 15, Prishtinë"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                  <FaTruck className="text-primary" /> Detajet e Dërgimit
                </h3>

                <div>
                  <label className="block font-medium mb-2">Data e Dërgimit të Dëshiruar *</label>
                  <input
                    type="date"
                    name="delivery_date"
                    value={formData.delivery_date}
                    onChange={handleChange}
                    min={minDate}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.delivery_date ? 'border-red-500' : 'border-gray-200'} focus:border-primary focus:outline-none transition-colors`}
                  />
                  {errors.delivery_date && <p className="text-red-500 text-sm mt-1">{errors.delivery_date}</p>}
                  <p className="text-gray-500 text-sm mt-2">
                    Zgjidhni datën kur dëshironi të merrni porosinë (minimum 24 orë përpara)
                  </p>
                </div>

                <div className="mt-4">
                  <label className="block font-medium mb-2">Shënime të Veçanta (Opsionale)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    placeholder="P.sh. Mesazh mbi tortë, alergji, udhëzime speciale..."
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                  <FaWallet className="text-primary" /> Metoda e Pagesës
                </h3>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={formData.payment === 'cash'}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary"
                    />
                    <FaMoneyBillWave className="text-2xl text-green-500" />
                    <span className="font-medium">Pagesë me Para në Dorë (Cash on Delivery)</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={formData.payment === 'bank'}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary"
                    />
                    <FaUniversity className="text-2xl text-blue-500" />
                    <span className="font-medium">Transfer Bankar</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  'Duke procesuar...'
                ) : (
                  <>
                    <FaLock /> Konfirmo Porosinë
                  </>
                )}
              </button>
            </form>
          </div>

          
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                <FaShoppingBag className="text-primary" /> Përmbledhja
              </h3>

              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 pb-3 border-b">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h6 className="font-medium text-sm">{item.name}</h6>
                      <span className="text-gray-500 text-sm">x{item.quantity}</span>
                    </div>
                    <span className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-4">
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
              </div>

              <hr className="mb-4" />

              <div className="flex justify-between text-xl font-bold">
                <span>Totali:</span>
                <span className="text-secondary">€{finalTotal.toFixed(2)}</span>
              </div>

              <div className="mt-6 bg-light p-4 rounded-xl">
                <div className="flex items-center gap-2 text-sm">
                  <FaLock className="text-green-500" />
                  <span>Pagesa e sigurt dhe e mbrojtur</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <FaPhone className="text-primary" />
                  <span>Pyetje? +383 44 123 456</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
