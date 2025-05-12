import React from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../Contexts/GlobalContext'
import { Categories, Products } from '../Data/DummyData'
import { filterNames } from '../Data/FilterMapping';
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
import { MdCompareArrows } from 'react-icons/md';
import ProductGrid from '../Components/Partials/Shop/ProductGrid';

const Product = () => {
  const { setWishlist, setCart, setCompareList, handleAddToCart, handleAddToCompare, handleAddToWishlist } = useGlobalContext();
  const { id } = useParams();
  const product = Products.find((prod) => prod.id === parseInt(id));
  const relatedProducts = Products.filter((prod) => prod.category === product.category && prod.id !== product.id);

  return (
    <>
    <div className="container flex py-12">
        <div className="max-w-1/2">
            <img className="container w-1/3" src={`/imgs/products/${product.image}`} alt={product.name} />
        </div>

        <div className="p-5 border-0 rounded-2xl mx-auto">
            
            <p>{product.category}</p>
            
            <h1 className="text-4xl font-semibold">{product.name}</h1>
            <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, index) => (
                        <svg
                            key={index}
                            className={`w-5 h-5 ${index < product.rating ? 'text-black' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                <span className="ml-2 text-gray-600">({product.reviews} recensioni)</span>
            </div>
            <p className="text-gray-500 mt-3 mb-4">{product.description}</p>

            
            <h2 className="text-3xl font-bold">€ {product.price}</h2>
            <span className="text-xs">Goditelo subito, pagalo con calma a TASSO ZERO - TAN fisso 0% e TAEG 0%</span>
            
            <div>
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold mb-4">Dettagli prodotto</h3>
                    <table className="w-full border-collapse">
                        <tbody>
                            {Object.entries(product).map(([key, value]) => {
                                // Skip excluded properties
                                if (['id', 'rating', 'reviews',  'name', 'image', 'category', 'price', 'description', 'createdAt', 'updatedAt'].includes(key)) {
                                    return null;
                                }
                                return (
                                    <tr key={key} className="border-b">
                                        <td className="py-2 px-4 font-medium capitalize">{filterNames.find(f => f.name === key)?.label}</td>
                                        <td className="py-2 px-4 text-nowrap">{value}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="product-actions flex mt-8">
                <button 
                    className="px-3 h-10 flex justify-center items-center bg-blue-600 text-white rounded-full p-2 mr-2 hover:bg-blue-900 cursor-pointer relative group"
                    title="Aggiungi al carrello"
                    onClick={() => handleAddToCart(product)}
                >
                    <FiShoppingCart /><span className="pl-3">Aggiungi al carrello</span>
                    <span className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">Aggiungi al carrello</span>
                </button>
                    <button 
                    className="w-10 h-10 flex justify-center items-center border rounded-full p-2 mr-2 hover:bg-red-600 hover:text-white cursor-pointer relative group"
                    title="Aggiungi ai preferiti"
                    onClick={() => handleAddToWishlist(product)}
                    >
                    <FaRegHeart />
                    <span className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">Aggiungi ai preferiti</span>
                    </button>
                <button 
                    className="w-10 h-10 flex justify-center items-center border rounded-full p-2 mr-2 hover:bg-gray-500 hover:text-white cursor-pointer relative group"
                    title="Confronta"
                    onClick={() => handleAddToCompare(product)}
                >
                    <MdCompareArrows />
                    <span className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">Confronta</span>
                </button>
            </div>
            <div>
                <h3 className="font-bold text-sm mt-8">Servizi disponibili</h3>
                <p className="text-sm">Hai bisogno di aiuto per montare {product.name}? <span className="underline cursor-pointer">Scopri di più</span></p>
            </div>
        </div>  
    </div>

    <div className="container mx-auto pb-12">
        <h2 className="text-3xl font-semibold my-8">Prodotti correlati</h2>
        <ProductGrid products={relatedProducts.splice(1,4)} />
    </div>
    </>
  )
}

export default React.memo(Product)