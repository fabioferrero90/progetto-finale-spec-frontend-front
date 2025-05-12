import { useLocation } from 'react-router-dom'
import { Products } from '../Data/DummyData'
import ProductGrid from '../Components/Partials/Shop/ProductGrid'
import React from'react'
import Product from './Product'

const Results = () => {
  const { search } = useLocation()
  const query = new URLSearchParams(search).get('query')
  const results = Products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) || 
    product.description.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="container py-12">
      <div className="text-center text-3xl font-semibold">
        Risultato della ricerca: {query || 'Nessun termine di ricerca trovato'}
      </div>
      {results.length === 0 ? (
        <div className="text-center text-gray-500">Nessun risultato trovato</div>
      ) : (
        <>
          <div className="text-center text-gray-500 pb-8">Trovati {results.length} risultati</div>
          <ProductGrid products={results} />
        </>
      )}
    </div>

  )
}

export default React.memo(Results)