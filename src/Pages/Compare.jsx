import React from 'react'
import { useGlobalContext } from '../Contexts/GlobalContext'
import { filterNames } from '../Data/FilterMapping';

const Compare = () => {
  const { compareList, setCompareList } = useGlobalContext()

  return (
    <div className="container py-12">
      <div className="category-header text-center text-4xl font-semibold mb-8">
        <h1>Compara prodotti</h1>
      </div>
      {compareList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-0 p-4"></th>
                {compareList.slice(0, 5).map((product) => (
                  <th key={product.id} className="border-0 p-4">
                    <button
                      onClick={() => setCompareList(compareList.filter(p => p.id !== product.id))}
                      className="float-right text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      ✕ Rimuovi
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-white p-4 font-semibold bg-gray-200 text-black">Immagine</td>
                {compareList.slice(0, 5).map((product) => (
                  <td key={product.id} className="border-2 border-white p-4">
                    <img 
                      src={`/imgs/products/${product.image}`} 
                      alt={product.name} 
                      className="w-32 h-32 object-contain mx-auto"
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border-2 border-white p-4 font-semibold bg-gray-200 text-black">Nome</td>
                {compareList.slice(0, 5).map((product) => (
                  <td key={product.id} className="border-2 border-white p-4">{product.name}</td>
                ))}
              </tr>
              <tr>
                <td className="border-2 border-white p-4 font-semibold bg-gray-200 text-black">Descrizione</td>
                {compareList.slice(0, 5).map((product) => (
                  <td key={product.id} className="border-2 border-white p-4">{product.description}</td>
                ))}
              </tr>
              <tr>
                <td className="border-2 border-white p-4 font-semibold bg-gray-200 text-black">Prezzo</td>
                {compareList.slice(0, 5).map((product) => (
                  <td key={product.id} className="border-2 border-white p-4 font-bold">€{product.price}</td>
                ))}
              </tr>
              <tr>
                <td className="border-2 border-white p-4 font-semibold bg-gray-200 text-black">Categoria</td>
                {compareList.slice(0, 5).map((product) => (
                  <td key={product.id} className="border-2 border-white p-4">{product.category}</td>
                ))}
              </tr>
              {Object.keys(compareList[0] || {}).map((key) => {
                if (!['id', 'image', 'name', 'rating', 'reviews', 'category', 'description', 'price', 'createdAt', 'updatedAt'].includes(key)) {
                  return (
                    <tr key={key}>
                      <td className="border-2 border-white p-4 font-semibold capitalize bg-gray-200 text-black">
                          {filterNames.find(f => f.name === key)?.label}
                      </td>
                      {compareList.slice(0, 5).map((product) => (
                        <td key={product.id} className="border-2 border-white p-4">
                          {product[key]}
                        </td>
                      ))}
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <h2>Nessun prodotto da comparare</h2>
          <p>Aggiungi almeno due prodotti da confrontare dalla lista prodotti</p>
        </div>
      )}
    </div>
  )
}

export default Compare