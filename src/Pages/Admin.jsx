import React, { useEffect, useState, useCallback } from 'react'
import { Categories } from 'Data/Categories'
import { useGlobalContext } from 'Contexts/GlobalContext'
import ProductList from '../Components/Partials/Admin/ProductList'
import Modal from '../Components/Partials/Admin/Modal'

const Admin = () => {
    const { products, fetchAllProducts, isUsingAPI } = useGlobalContext();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.category === selectedCategory));
        }
    }, [selectedCategory, products]);


    return (
        <div className="container">
            <div className="flex">
                <div className="w-64 bg-gray-100 p-4 flex flex-col">
                    <h2 className="text-lg font-semibold mb-4">Categorie</h2>
                    <ul className="space-y-2 mb-24">
                        <li>
                            <button
                                className="w-full text-left px-4 py-2 rounded hover:bg-gray-200 cursor-pointer"
                                onClick={() => setSelectedCategory("all")}
                            >
                                Tutti i Prodotti
                            </button>
                        </li>
                        {Categories.map((category) => (
                            <li key={category.slug}>
                                <button
                                    className="w-full text-left px-4 py-2 rounded hover:bg-gray-200 cursor-pointer"
                                    onClick={() => setSelectedCategory(category.name)}
                                >
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                    {!isUsingAPI && <span className="text-xs text-red-600 text-center mt-auto pb-3">Devi attivare la API Mode per utilizzare questa funzione</span>}
                    <button
                        className={"bg-black text-white rounded-md py-2 cursor-pointer hover:bg-blue-600" + (isUsingAPI ? ' mt-auto' : '')}
                        onClick={() => setIsModalOpen(true)}>
                        Aggiungi Prodotto
                    </button>
                </div>

                <div className="flex-1 p-8">
                    <h1 className="text-3xl font-bold mb-8">Gestione Prodotti</h1>
                    <ProductList products={filteredProducts} />
                </div>
            </div>
            {isModalOpen && <Modal type="addproduct" closeModal={closeModal} />}
        </div>
    )
}

export default Admin