import React from 'react'
import ProductCard from '../../Shop/ProductCard';
import { useGlobalContext } from '../../../../Contexts/GlobalContext';

const DeleteProduct = ({ product, closeModal }) => {

    const { deleteProduct, isUsingAPI, addNotification } = useGlobalContext();

    const handleDeleteProduct = (id, category) => {
        if (!isUsingAPI) {
            addNotification('API Mode non attiva', 'Questa funzionalità non è disponibile senza la API Mode attiva')
        } else {
            deleteProduct(id, category);
            closeModal();
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative bg-white p-6 rounded-lg shadow-xl mx-4">
                <div className="delete-confirmation">
                    <div className="pointer-events-none p-8 border-1 rounded-xl">
                        <ProductCard product={product} />
                    </div>
                    <p className="mt-5 text-lg text-center font-semibold">Sei sicuro di voler eliminare {product.title}?</p>
                    <p className="mb-3 text-center">L'operazione è irreversibile</p>
                    <div className="flex justify-end gap-3 pt-5">
                        <button
                            className="cursor-pointer px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                            onClick={closeModal}>Annulla</button>
                        <button
                            className="cursor-pointer px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                            onClick={() => handleDeleteProduct(product.id, product.category)}
                        >Conferma</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(DeleteProduct)