import { useLocation } from 'react-router-dom'
import { useGlobalContext } from 'Contexts/GlobalContext'
import ProductGrid from '../Components/Partials/Shop/ProductGrid'
import React, { useEffect, useMemo } from 'react'

const Results = () => {
  const { search } = useLocation()
  const { products, fetchAllProducts } = useGlobalContext()
  const query = new URLSearchParams(search).get('query')
  const filteredResults = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <div className="container py-12">
      <div className="text-center text-3xl font-semibold">
        Risultato della ricerca: {query || 'Nessun termine di ricerca trovato'}
      </div>
      {filteredResults.length === 0 ? (
        <div className="text-center text-gray-500">Nessun risultato trovato</div>
      ) : (
        <>
          <div className="text-center text-gray-500 pb-8">Trovati {filteredResults.length} risultati</div>
          <ProductGrid products={filteredResults} />
        </>
      )}
    </div>

  )
}

export default React.memo(Results)