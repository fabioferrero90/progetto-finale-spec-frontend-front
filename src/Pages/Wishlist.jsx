import React from 'react'
import ProductGrid from '../Components/Partials/Shop/ProductGrid'
import { useGlobalContext } from 'Contexts/GlobalContext'

const Wishlist = () => {
  const { wishlist } = useGlobalContext()

  return (
    <div className="container py-12">
      <div className="category-header text-center text-4xl font-semibold mb-8">
        <h1>Wishlist</h1>
      </div>
      {wishlist.length === 0 ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">La tua lista dei preferiti è vuota</h2>
          <p className="text-gray-600">
            Aggiungi prodotti alla tua wishlist per poterli visualizzare qui.
          </p>
        </div>
      ) : (
        <ProductGrid products={wishlist} isWishlist={true} />
      )}
    </div>
  )
}

export default Wishlist