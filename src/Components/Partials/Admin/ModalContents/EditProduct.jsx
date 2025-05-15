import React, { useState } from 'react'
import ProductCard from '../../Shop/ProductCard';
import { filterNames } from '../../../../Data/FilterMapping';
import { useGlobalContext } from '../../../../Contexts/GlobalContext';

const EditProduct = ({ product, closeModal }) => {

    const { updateProduct, isUsingAPI, addNotification } = useGlobalContext();

    const [editedProduct, setEditedProduct] = useState({
        ...product,
        price: Number(product.price)
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target

        const numericFields = ['price', 'rating', 'reviews', 'seats', 'height', 'length', 'width']
        const isNumericField = numericFields.includes(name)

        setEditedProduct(prev => ({
            ...prev,
            [name]: isNumericField ? (value === '' ? 0 : Number(value)) : value
        }))
    }

    const previewProduct = {
        ...product,
        title: editedProduct.title,
        description: editedProduct.description,
        price: editedProduct.price
    }

    const handleEditProduct = (e, product) => {
        e.preventDefault();
        if (!isUsingAPI) {
            addNotification('API Mode non attiva', 'Questa funzionalità non è disponibile senza la API Mode attiva')
        } else {
            updateProduct(product, product.category);
            closeModal();
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative bg-white p-6 rounded-lg shadow-xl mx-4">
                <div className="edit-form">
                    <h2 className="text-2xl font-bold mb-4">Modifica Prodotto</h2>
                    <div className="flex justify-between gap-15">
                        <div className="pointer-events-none p-8 border-1 rounded-xl max-w-[300px]">
                            <ProductCard product={previewProduct} />
                        </div>
                        <form>
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Titolo</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={editedProduct.title}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrizione</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={editedProduct.description}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="4"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(editedProduct).map(([key, value]) => {
                                        if (["id", "createdAt", "updatedAt", "rating", "reviews", "parsed", "title", "description"].includes(key)) {
                                            return null;
                                        }

                                        const isYesNoField = value === "Si" || value === "No";
                                        const inputType = isYesNoField ? 'select' : typeof value === 'number' ? 'number' : 'text';

                                        return (
                                            <div key={key} className="mb-4">
                                                <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                                                    {filterNames.find(f => f.name === key)?.label}
                                                </label>
                                                {isYesNoField ? (
                                                    <select
                                                        id={key}
                                                        name={key}
                                                        value={value}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    >
                                                        <option value="Si">Si</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                ) : (
                                                    <input
                                                        type={inputType}
                                                        id={key}
                                                        name={key}
                                                        value={value}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" className="cursor-pointer px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200" onClick={closeModal}>Annulla</button>
                                <button
                                    type="submit"
                                    className="cursor-pointer px-4 py-2 text-white bg-black rounded-md hover:bg-blue-700"
                                    onClick={(e) => handleEditProduct(e, editedProduct)}
                                >Salva Modifiche</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(EditProduct)