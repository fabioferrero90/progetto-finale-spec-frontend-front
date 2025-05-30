import React, { useState } from 'react'
import { useGlobalContext } from 'Contexts/GlobalContext'
import ProductCard from 'Shop/ProductCard'

const AddProduct = ({ closeModal }) => {

  const { findName, insertProduct, isUsingAPI, addNotification } = useGlobalContext();
  const [category, setCategory] = useState('');
  const [productToAdd, setProductToAdd] = useState({});

  const productFields = {
    beds: {
      title: "",
      reviews: 0,
      rating: 1,
      description: "",
      category: "Letti e Materassi",
      price: 0,
      size: "",
      material: "",
      color: "",
      height: 0,
      storageIncluded: "No",
      image: ""
    },
    sofas: {
      title: "",
      reviews: 0,
      rating: 1,
      description: "",
      category: "Divani e Poltrone",
      price: 0,
      seats: 0,
      material: "",
      color: "",
      reclinabile: "No",
      washableCover: "No",
      image: ""
    },
    tables: {
      title: "",
      reviews: 0,
      rating: 1,
      description: "",
      category: "Tavoli e Sedie",
      price: 0,
      seats: 0,
      material: "",
      extendable: "No",
      length: 0,
      width: 0,
      image: ""
    }
  }

  function checkIfCorrectProduct(product) {
    const category = product.category.toLowerCase().includes('divani') ? 'sofas' :
      product.category.toLowerCase().includes('tavoli') ? 'tables' :
        'beds';
    const templateProduct = productFields[category];
    if (!templateProduct) {
      addNotification('Errore di inserimento', 'Categoria non valida');
      return false;
    }
    for (const [key, expectedValue] of Object.entries(templateProduct)) {
      if (!(key in product)) {
        addNotification('Errore di inserimento', `Il campo ${findName(key)} non esiste`);
        return false;
      }
      if (product[key] === null || product[key] === undefined) {
        addNotification('Errore di inserimento', `Il campo ${findName(key)} non può essere vuoto`);
        return false;
      }
      if (typeof product[key] !== typeof expectedValue) {
        addNotification('Errore di inserimento', `Il campo ${findName(key)} deve essere di tipo ${typeof expectedValue}`);
        return false;
      }
      if (typeof expectedValue === 'number' && isNaN(product[key])) {
        addNotification('Errore di inserimento', `Il campo ${findName(key)} deve essere un numero`);
        return false;
      }
      if (typeof expectedValue === 'string' && product[key].trim() === '') {
        addNotification('Errore di inserimento', `Il campo ${findName(key)} non può essere vuoto`);
        return false;
      }
    }
    return true;
  }

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (cat === "") {
      return;
    }
    setProductToAdd(productFields[cat]);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ['price', 'rating', 'reviews', 'seats', 'height', 'length', 'width']
    const isNumericField = numericFields.includes(name)
    if (value < 0) return;
    setProductToAdd(prev => ({
      ...prev,
      [name]: isNumericField ? (value === '' ? 0 : Number(value.replace(/^0+/, ''))) : value
    }));
  }

  const handleInsertProduct = (e, product) => {
    e.preventDefault();
    if (!isUsingAPI) {
      addNotification('API Mode non attiva', 'Questa funzionalità non è disponibile senza la API Mode attiva')
    } else {
      if (checkIfCorrectProduct(product)) {
        insertProduct(product, product.category);
        closeModal();
      }
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-xl w-[800px] mx-4">
        <div className="add-product">
          <h2 className="text-2xl font-bold mb-4">Aggiungi Prodotto</h2>
          <div className="flex w-full gap-5">
            <div className="w-full border-1 border-black p-5 rounded-xl pointer-events-none">
              <ProductCard product={productToAdd} />
              <table className="w-full border-collapse mt-3">
                <tbody>
                  {Object.entries(productToAdd).map(([key, value]) => {
                    // Skip excluded properties
                    if (['id', 'rating', 'reviews', 'title', 'image', 'category', 'price', 'description', 'createdAt', 'updatedAt'].includes(key)) {
                      return null;
                    }
                    return (
                      <tr key={key} className="border-b text-xs">
                        <td className="py-2 px-4 font-medium capitalize w-2/5">{findName(key)}</td>
                        <td className="py-2 px-4 text-nowrap">{value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="w-full">
              <form>
                <div className="mb-4 w-full">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                  <select
                    htmlFor="category"
                    className="block pl-3 w-full border-1 border-gray-300 py-3 rounded-xl mr-2 font-medium hover:bg-gray-100 text-gray-700 mb-1"
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    <option value="">Seleziona una categoria</option>
                    <option value="tables">Tavoli e Sedie</option>
                    <option value="sofas">Divani e Poltrone</option>
                    <option value="beds">Letti e Materassi</option>
                  </select>
                </div>
                {category !== "" && Object.entries(productToAdd).map(([key, value]) => {
                  if (["rating", "reviews", "parsed", "category"].includes(key)) {
                    return null;
                  }

                  const isYesNoField = value === "Si" || value === "No";
                  const isDescriptionField = key === "description";
                  const inputType = typeof value === 'number' ? 'number' : 'text';

                  const halfSizeInputs = ['length', 'width', 'height', 'price', 'size', 'seats', 'color', 'material'];
                  if (halfSizeInputs.includes(key) || isYesNoField) {
                    return (
                      <div key={key} className="mb-4 w-[48%] inline-block mr-[2%] last:mr-0">
                        <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                          {findName(key)}
                        </label>
                        {isYesNoField ? (
                          <select
                            id={key}
                            name={key}
                            value={value}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full px-3 py-2 border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={key} className="mb-4 w-full">
                      <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                        {findName(key)}
                      </label>
                      {isYesNoField ? (
                        <select
                          id={key}
                          name={key}
                          value={value}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Si">Si</option>
                          <option value="No">No</option>
                        </select>
                      ) : isDescriptionField ? (
                        <textarea
                          id={key}
                          name={key}
                          value={value}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={4}
                        />
                      ) : (
                        <input
                          type={inputType}
                          id={key}
                          name={key}
                          value={value}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>
                  );
                })}
              </form>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" className="cursor-pointer px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200" onClick={closeModal}>Annulla</button>
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 text-white bg-black rounded-md hover:bg-blue-700"
              onClick={(e) => handleInsertProduct(e, productToAdd)}
            >Inserisci Prodotto</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AddProduct)