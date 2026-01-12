import { useState } from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaClock, FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok, FaPaperPlane, FaChevronDown, FaChevronUp } from 'react-icons/fa'

const faqs = [
  {
    question: "Sa kohë përpara duhet të porosis?",
    answer: "Rekomandojmë të porosisni së paku 24-48 orë përpara, veçanërisht për tortat e personalizuara. Për ngjarje të mëdha si dasma, rekomandojmë 1-2 javë përpara."
  },
  {
    question: "A bëni dërgim jashtë Prishtinës?",
    answer: "Po, bëjmë dërgim në Ferizaj, Mitrovicë, Gjilan dhe qytete të tjera pranë Prishtinës. Tarifat e dërgimit varen nga distanca. Na kontaktoni për detaje."
  },
  {
    question: "A mund të bëj një tortë të personalizuar?",
    answer: "Sigurisht! Specializohemi në torta të personalizuara për ditëlindje, dasma, dhe çdo rast tjetër special. Na dërgoni idenë tuaj dhe ne do ta realizojmë!"
  },
  {
    question: "Cilat janë metodat e pagesës?",
    answer: "Pranojmë pagesë cash në dorëzim (Cash on Delivery) dhe transfer bankar. Për porosi të mëdha, kërkojmë një paradhënie 50%."
  }
]

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div>
      
      <div className="bg-gradient-to-r from-secondary to-dark py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <FaEnvelope className="inline-block mr-3" />
            Na Kontaktoni
          </h1>
          <p className="text-lg opacity-90">Jemi këtu për t'ju ndihmuar me çdo pyetje</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="font-display text-2xl font-bold mb-6">Dërgoni një Mesazh</h3>
            
            {submitted && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6">
                <strong>Sukses!</strong> Mesazhi juaj u dërgua. Do t'ju kontaktojmë së shpejti.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-medium mb-2">Emri Juaj *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  placeholder="P.sh. Arta Hoxha"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  placeholder="P.sh. arta@email.com"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Telefoni</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  placeholder="P.sh. +383 44 123 456"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Subjekti *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Zgjidhni një subjekt</option>
                  <option value="order">Pyetje rreth porosive</option>
                  <option value="custom">Porosi e personalizuar</option>
                  <option value="event">Ngjarje / Evente</option>
                  <option value="feedback">Feedback / Sugjerime</option>
                  <option value="other">Tjetër</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block font-medium mb-2">Mesazhi Juaj *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  placeholder="Shkruani mesazhin tuaj këtu..."
                />
              </div>

              <button type="submit" className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2">
                <FaPaperPlane /> Dërgo Mesazhin
              </button>
            </form>
          </div>

          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-display text-2xl font-bold mb-6">Informacione Kontakti</h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg">Adresa</h5>
                    <p className="text-gray-500">Rame Avdyli<br />Pozharanjë, Kosovë</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg">Telefoni</h5>
                    <p className="text-gray-500">
                      <a href="tel:+38344958935" className="hover:text-primary">044 958 935</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg">Orari i Punës</h5>
                    <p className="text-gray-500">
                      E Hënë - E Premte: 08:00 - 20:00<br />
                      E Shtunë: 09:00 - 18:00<br />
                      E Diel: 10:00 - 16:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h5 className="font-semibold text-lg mb-4">Na Ndiqni në Rrjetet Sociale</h5>
              <div className="flex gap-3">
                <a href="#" className="w-12 h-12 rounded-full border-2 border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                  <FaFacebookF className="text-xl" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border-2 border-pink-500 text-pink-500 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border-2 border-green-500 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors">
                  <FaWhatsapp className="text-xl" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border-2 border-gray-800 text-gray-800 flex items-center justify-center hover:bg-gray-800 hover:text-white transition-colors">
                  <FaTiktok className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11739.5!2d21.1!3d42.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549e7b7c8a4a1f%3A0x1234567890abcdef!2sPozharanj%C3%AB%2C%20Kosovo!5e0!3m2!1sen!2s!4v1640000000000!5m2!1sen!2s"
              className="w-full h-80"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokacioni - Pozharanjë, Kosovë"
            />
          </div>
        </div>

        
        <div className="mt-16">
          <div className="section-title">
            <h2>Pyetje të Shpeshta</h2>
            <div className="divider"></div>
          </div>

          <div className="max-w-3xl mx-auto mt-8 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  {faq.question}
                  {openFaq === index ? <FaChevronUp className="text-primary" /> : <FaChevronDown className="text-gray-400" />}
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
