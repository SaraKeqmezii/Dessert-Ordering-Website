import { Link } from 'react-router-dom'
import { FaHeart, FaMedal, FaUsers, FaCheckCircle, FaArrowRight, FaInstagram, FaFacebookF, FaShoppingBag, FaPhone } from 'react-icons/fa'

const team = [
  {
    name: "Elira Hoxha",
    role: "Themeluese & Kuzhiniere Kryesore",
    initials: "EH"
  },
  {
    name: "Drita Berisha",
    role: "Menaxhere e Porosive",
    initials: "DB"
  }
]

const stats = [
  { value: "5+", label: "Vite Përvojë" },
  { value: "2000+", label: "Klientë të Kënaqur" },
  { value: "50+", label: "Receta Unike" },
  { value: "100%", label: "Përbërës Natyralë" }
]

function About() {
  return (
    <div>
      
      <div className="bg-gradient-to-r from-secondary to-dark py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <FaHeart className="inline-block mr-3" />
            Rreth Nesh
          </h1>
          <p className="text-lg opacity-90">Njihuni me historinë dhe pasionin tonë për ëmbëlsirat</p>
        </div>
      </div>

      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl font-bold mb-6">Historia Jonë</h2>
            <p className="text-xl text-gray-500 mb-4">
              Ëmbëlsira filloi si një ëndërr e vogël në kuzhinën e familjes sonë, ku nëna dhe gjyshja 
              na mësonin sekretet e recetave tradicionale shqiptare.
            </p>
            <p className="text-gray-600 mb-4">
              Që nga viti 2020, kemi transformuar atë pasion në një biznes që sjell gëzim në tryezat 
              e familjev shqiptare. Çdo tortë, bakllavë dhe ëmbëlsirë që krijojmë është bërë me të 
              njëjtin dashuri dhe kujdes si ato të gjyshes.
            </p>
            <p className="text-gray-600">
              Sot, jemi krenarë që shërbejmë qindra familje në Prishtinë dhe rrethe, duke sjellë 
              ëmbëlsi dhe momente të veçanta në çdo festë dhe ngjarje speciale.
            </p>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="section-title">
            <h2>Vlerat Tona</h2>
            <div className="divider"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-4xl text-primary" />
              </div>
              <h4 className="font-display text-xl font-semibold mb-2">Pasion</h4>
              <p className="text-gray-500">Çdo produkt krijohet me pasion dhe dashuri për artin e pastiçerisë.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMedal className="text-4xl text-primary" />
              </div>
              <h4 className="font-display text-xl font-semibold mb-2">Cilësi</h4>
              <p className="text-gray-500">Përdorim vetëm përbërës të cilësisë së lartë dhe të freskët.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-4xl text-primary" />
              </div>
              <h4 className="font-display text-xl font-semibold mb-2">Familje</h4>
              <p className="text-gray-500">Trajtojmë çdo klient si pjesë e familjes sonë të madhe.</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="section-title">
            <h2>Ekipi Ynë</h2>
            <div className="divider"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center w-72">
                <div className="w-36 h-36 rounded-full mx-auto mb-4 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{member.initials}</span>
                </div>
                <h5 className="font-display text-xl font-semibold mb-1">{member.name}</h5>
                <p className="text-gray-500 text-sm mb-4">{member.role}</p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    <FaInstagram className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    <FaFacebookF className="text-xl" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl font-bold mb-8 text-center">Pse të Zgjidhni Ne?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <FaCheckCircle className="text-2xl text-primary flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-lg mb-1">Përvojë mbi 5 Vjet</h5>
                  <p className="text-gray-500">Kemi përvojë të gjatë në krijimin e ëmbëlsirave të shijshme.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <FaCheckCircle className="text-2xl text-primary flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-lg mb-1">Receta Origjinale</h5>
                  <p className="text-gray-500">Përdorim receta familjare dhe të reja për një shije unike.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <FaCheckCircle className="text-2xl text-primary flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-lg mb-1">Dërgim i Sigurt</h5>
                  <p className="text-gray-500">Paketojmë me kujdes për të garantuar cilësinë e produktit.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <FaCheckCircle className="text-2xl text-primary flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-lg mb-1">Porosi të Personalizuara</h5>
                  <p className="text-gray-500">Krijojmë torta dhe ëmbëlsira sipas dëshirës suaj.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold mb-4">Dëshironi të Porosisni?</h2>
          <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
            Shikoni produktet tona ose na kontaktoni për porosi të personalizuara.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-primary flex items-center justify-center gap-2">
              <FaShoppingBag /> Shiko Produktet
            </Link>
            <Link to="/contact" className="btn-outline flex items-center justify-center gap-2">
              <FaPhone /> Na Kontaktoni
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
