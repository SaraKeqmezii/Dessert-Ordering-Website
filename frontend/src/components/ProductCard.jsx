import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'

function ProductCard({ product }) {
  const categoryLabels = {
    torta: 'Tortë',
    cupcakes: 'Cupcakes',
    biskota: 'Biskota',
    tradicionale: 'Tradicionale'
  }

  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-accent text-secondary px-3 py-1 rounded-full text-sm font-medium">
            {categoryLabels[product.category]}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-dark mb-2">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-secondary">
            €{product.price}
          </span>
        </div>
        <Link 
          to={`/product/${product.id}`}
          className="w-full btn-primary text-center text-sm py-2 flex items-center justify-center gap-2"
        >
          <FaEye /> Shiko
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
