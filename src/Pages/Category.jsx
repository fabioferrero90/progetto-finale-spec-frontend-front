import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Categories } from '../Data/Categories'
import ProductGrid from '../Components/Partials/Shop/ProductGrid';
import FilterButton from '../Components/Partials/Shop/FilterButton';
import { filterNames } from '../Data/FilterMapping';
import { useGlobalContext } from '../Contexts/GlobalContext';

const Category = () => {
  const { category } = useParams()
  const { fetchProducts, products, setProducts } = useGlobalContext();
  const categoryData = Categories.find((cat) => cat.slug === category)
  const [filters, setFilters] = useState([])
  const [selectedFilters, setSelectedFilters] = useState([])
  const [sortOrder, setSortOrder] = useState('price_asc')
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    setProducts([]);
    if (category !== "outdoorproducts") {
      fetchProducts(category);
      setSelectedFilters([]);
    }
  }, [category]);

  useEffect(() => {
    if (products.length === 0) return;

    const applyFilters = () => {
      if (selectedFilters.length === 0) {
        return [...products];
      }

      return products.filter((product) => {
        return selectedFilters.every((filter) => {
          const productValue = product[filter.name];
          if (filter.value === 'all') return true;
          if (Array.isArray(productValue)) {
            return productValue.includes(filter.value);
          }
          if (typeof productValue === 'number') {
            return productValue >= Number(filter.value);
          }
          return productValue === filter.value;
        });
      });
    };

    const filteredProducts = applyFilters();
    setFilteredProducts(filteredProducts);
  }, [selectedFilters]);

  useEffect(() => {
    setFilteredProducts(products);
    const productFilters = [];
    products.forEach(product => {
      Object.entries(product).forEach(([key, value]) => {
        const excludedProperties = [
          'category',
          'rating',
          'reviews',
          'id',
          'image',
          'title',
          'description',
          'updatedAt',
          'createdAt',
          'price'
        ];
        if (excludedProperties.includes(key)) {
          return;
        }
        const existingFilter = productFilters.find(filter => filter.name === key);
        if (!existingFilter) {
          productFilters.push({
            name: key,
            options: Array.isArray(value) ? [...new Set(value)] : [value]
          });
        } else {
          const newOptions = Array.isArray(value) ? value : [value];
          existingFilter.options = [...new Set([...existingFilter.options, ...newOptions])];
        }
      });
    });
    setFilters(productFilters);
  }, [products]);

  const handleSort = (value) => {
    const sortedProducts = [...filteredProducts]
    switch (value) {
      case 'price_asc':
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        sortedProducts.sort((a, b) => b.price - a.price)
        break
      case 'name_asc':
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name_desc':
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        return
    }
    setFilteredProducts(sortedProducts)
  }

  return (
    <div className="container py-12">
      <div className="category-header text-center text-4xl font-semibold mb-8">
        <h1>{categoryData.name}</h1>
      </div>
      {products.length === 0 ? (
        <div className="no-products flex flex-col justify-center items-center">
          <img className="max-w-[200px]" src="/imgs/notfound.jpg" alt="" />
          <p className="font-semibold">Non ci sono prodotti in questa categoria.</p>
          <p>Prova a cercare altrove...un mondo di prodotti BKEA ti aspetta!</p>
        </div>
      ) : (
        <>
          <div className="filters-bar flex flex-wrap items-center justify-start py-3">
            <FilterButton
              name="order"
              options={['price_asc', 'price_desc', 'name_asc', 'name_desc']}
              onChange={(name, value) => {
                setSortOrder(value)
                handleSort(value)
              }}
            />
            {filters.map((filter, index) => (
              <FilterButton key={index} name={filter.name} options={filter.options}
                onChange={(name, value) => {
                  if (value === 'all') {
                    setSelectedFilters(selectedFilters.filter(f => f.name !== name))
                    return
                  }
                  const newFilters = selectedFilters.filter(f => f.name !== name)
                  newFilters.push({ name, value })
                  setSelectedFilters(newFilters)
                }} />
            ))}
          </div>
          <div className="flex gap-3 mb-8">
            {selectedFilters.length > 0 && (
              selectedFilters.map((filter, index) => (
                <div key={index} className="text-xs px-3 bg-gray-100 flex">
                  <span>{filterNames.find(f => f.name === filter.name)?.label}: {filter.value}</span>
                  <button
                    className="remove-button ml-2 text-gray-500 border-0 rounded-2xl cursor-pointer"
                    onClick={() => {
                      setSelectedFilters(selectedFilters.filter(f => f.name !== filter.name))
                    }}
                  >
                    x
                  </button>
                </div>
              ))
            )}
          </div>
          <ProductGrid products={filteredProducts} />
        </>
      )}
    </div>
  )
}

export default Category