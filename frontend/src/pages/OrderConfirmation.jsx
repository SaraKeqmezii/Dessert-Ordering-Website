import { useParams, Link } from 'react-router-dom'
import { FaCheckCircle, FaHome, FaShoppingBag, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa'

function OrderConfirmation() {
  const { id } = useParams()
  
  const orders = JSON.parse(localStorage.getItem('orders') || '[]')
  const order = orders.find(o => o.id === parseInt(id))

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Porosia nuk u gjet</h2>
        <Link to="/" className="btn-primary">Kthehu në Kryefaqje</Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          
          <div className="w-28 h-28 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-5xl text-white" />
          </div>

          <h1 className="font-display text-4xl font-bold text-dark mb-4">Porosia u Pranua!</h1>
          <p className="text-xl text-gray-500 mb-8">
            Faleminderit që zgjodhët Ëmbëlsira! Porosia juaj u regjistrua me sukses.
          </p>

          
          <div className="bg-light rounded-2xl p-6 mb-8 text-left">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <span className="text-gray-500 text-sm">Numri i Porosisë:</span>
                <h3 className="text-2xl font-bold text-secondary">#{order.id}</h3>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Data e Porosisë:</span>
                <h4 className="text-lg font-semibold">
                  {new Date(order.created_at).toLocaleDateString('sq-AL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </h4>
              </div>
            </div>

            <hr className="my-6" />

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-primary mt-1" />
                <div>
                  <span className="text-gray-500 text-sm block">Emri:</span>
                  <span className="font-medium">{order.customer.name}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaPhone className="text-primary mt-1" />
                <div>
                  <span className="text-gray-500 text-sm block">Telefoni:</span>
                  <span className="font-medium">{order.customer.phone}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-primary mt-1" />
                <div>
                  <span className="text-gray-500 text-sm block">Email:</span>
                  <span className="font-medium">{order.customer.email}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCalendarAlt className="text-primary mt-1" />
                <div>
                  <span className="text-gray-500 text-sm block">Data e Dërgimit:</span>
                  <span className="font-medium">{order.delivery_date}</span>
                </div>
              </div>
              <div className="md:col-span-2 flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <div>
                  <span className="text-gray-500 text-sm block">Adresa:</span>
                  <span className="font-medium">{order.customer.address}</span>
                </div>
              </div>
              {order.notes && (
                <div className="md:col-span-2 flex items-start gap-3">
                  <FaInfoCircle className="text-primary mt-1" />
                  <div>
                    <span className="text-gray-500 text-sm block">Shënime:</span>
                    <span className="font-medium">{order.notes}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          
          <div className="bg-white border rounded-2xl overflow-hidden mb-8 text-left">
            <div className="bg-gray-50 px-6 py-4 font-semibold">
              <FaShoppingBag className="inline-block mr-2" /> Produktet e Porositura
            </div>
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-6 py-3">Produkti</th>
                  <th className="text-center px-6 py-3">Sasia</th>
                  <th className="text-right px-6 py-3">Çmimi</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4 text-center">{item.quantity}</td>
                    <td className="px-6 py-4 text-right">€{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-right font-bold">Totali:</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary text-xl">
                    €{order.total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          
          <div className="bg-blue-50 text-blue-700 p-4 rounded-xl mb-8 text-left">
            <FaInfoCircle className="inline-block mr-2" />
            <strong>Çfarë ndodh tani?</strong><br />
            Do të kontaktoheni brenda 1-2 orëve për të konfirmuar porosinë tuaj. 
            Nëse keni pyetje, mund të na telefononi në <strong>+383 44 123 456</strong>.
          </div>

          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary flex items-center justify-center gap-2">
              <FaHome /> Kthehu në Kryefaqje
            </Link>
            <Link to="/products" className="btn-outline flex items-center justify-center gap-2">
              <FaShoppingBag /> Vazhdo Blerjen
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
