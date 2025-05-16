import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useGlobalContext } from '../../../Contexts/GlobalContext'
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import Modal from './Modal'

const ProductList = ({ products }) => {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const { isUsingAPI } = useGlobalContext()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    const [modalType, setModalType] = useState('');
    const [modalProduct, setModalProduct] = useState(null);

    const handleModalOpen = (type, product) => {
        setModalType(type);
        setModalProduct(product);
        setIsModalOpen(true);
    };

    const PRODUCTS_PER_PAGE = 3;

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        setCurrentPage(1);
    }, [products, debouncedSearchTerm]);

    const filteredProducts = useMemo(() =>
        products.filter(product =>
            product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        ), [products, debouncedSearchTerm]
    );

    const { currentProducts, totalPages } = useMemo(() => {
        const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
        const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
        return {
            currentProducts: filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct),
            totalPages: Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
        };
    }, [filteredProducts, currentPage]);

    const handlePageChange = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    if (products.length === 0) {
        return <p className="text-center mt-20">Nessun prodotto in questa categoria.</p>;
    }

    return (
        <>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Cerca prodotti..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
            </div>
            {filteredProducts.length === 0 ? (
                <p className="text-center mt-20">Nessun prodotto trovato.</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {currentProducts.map((product) => (
                            <div key={product.id} className="flex bg-white p-4 rounded-lg shadow">
                                {(() => {
                                    const imgProps = {
                                        alt: product.title,
                                        className: "w-32 h-32 object-cover rounded",
                                        onClick: () => navigate(`/product/${product.id}`)
                                    };

                                    if (product.image && product.image !== "") {
                                        if (!product.image.startsWith("http")) {
                                            return <img src={`/imgs/products/${product.image}`} {...imgProps} />;
                                        }
                                        return <img src={product.image} {...imgProps} />;
                                    }

                                    return <img src="/imgs/placeholder.jpg" {...imgProps} />;
                                })()}
                                <div className="ml-4 flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-semibold">{product.title}</h3>
                                            <p className="text-gray-600">{product.category}</p>
                                            <p className="text-lg font-medium mt-2">€{product.price}</p>
                                        </div>
                                        <div className="flex flex-col gap-3 content-end">
                                            {!isUsingAPI && (<span className="text-xs text-red-500">Devi attivare la API Mode per utilizzare queste funzioni</span>)}
                                            <div className="flex justify-end gap-3 w-full">
                                                <button
                                                    onClick={() => handleModalOpen('edit', product)}
                                                    className="px-4 py-2 bg-black text-white rounded hover:bg-blue-600 transition-colors cursor-pointer"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleModalOpen('delete', product)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
                                                >
                                                    <FaRegTrashAlt />
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                    <p className="text-gray-700 mt-2">{product.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 cursor-pointer rounded transition-colors ${currentPage === index + 1
                                    ? 'bg-black text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
            {isModalOpen && <Modal type={modalType} product={modalProduct} closeModal={closeModal} />}
        </>
    );
};

export default React.memo(ProductList);
