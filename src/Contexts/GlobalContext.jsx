import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";

import DBbeds from '../../server-files/database/beds.json'
import DBtables from '../../server-files/database/tables.json'
import DBsofas from '../../server-files/database/sofas.json'

const GlobalContext = createContext();
const apiUrl = import.meta.env.VITE_APP_API_URL

const GlobalProvider = ({ children }) => {
  const parsedData = {
    beds: DBbeds.map(bed => ({ ...bed, parsed: true })),
    tables: DBtables.map(table => ({ ...table, parsed: true })),
    sofas: DBsofas.map(sofa => ({ ...sofa, parsed: true }))
  };

  const [isUsingAPI, setIsUsingAPI] = useState(() => {
    const savedAPIPreference = localStorage.getItem('isUsingAPI');
    return savedAPIPreference ? JSON.parse(savedAPIPreference) : false;
  });

  useEffect(() => {
    localStorage.setItem('isUsingAPI', JSON.stringify(isUsingAPI));
  }, [isUsingAPI]);

  const [products, setProducts] = useState([]);

  const fetchProducts = async (category) => {
    if (isUsingAPI) {
      try {
        const response = await fetch(`${apiUrl}/${category}es`);
        const data = await response.json();

        const detailPromises = data.map(prod =>
          fetch(`${apiUrl}/${category}es/${prod.id}`)
            .then(res => res.json())
            .then(json => json[category])
        );
        const completeData = await Promise.all(detailPromises);
        setProducts(completeData);
      } catch (error) {
        console.error('Errore nel fetch dei prodotti:', error);
      }
    } else {
      // Usa i dati del database locale
      console.log("Utilizzo i prodotti dal database locale");
      const DBData = category === 'sofas' ? parsedData.sofas :
        category === 'tables' ? parsedData.tables :
          parsedData.beds;
      setProducts(DBData);
    }

  };

  const fetchAllProducts = async () => {
    if (isUsingAPI) {

      try {
        const [sofaResponse, tableResponse, bedResponse] = await Promise.all([
          fetch(`${apiUrl}/sofases`),
          fetch(`${apiUrl}/tableses`),
          fetch(`${apiUrl}/bedses`)
        ]);
        const [sofaData, tableData, bedData] = await Promise.all([
          sofaResponse.json(),
          tableResponse.json(),
          bedResponse.json()
        ]);
        const productList = [...sofaData, ...tableData, ...bedData];

        const detailPromises = productList.map(prod => {
          const category = prod.category.toLowerCase().includes('divani') ? 'sofas' :
            prod.category.toLowerCase().includes('tavoli') ? 'tables' :
              'beds';
          return fetch(`${apiUrl}/${category}es/${prod.id}`)
            .then(res => res.json())
            .then(json => json[category]);
        });

        const completeData = await Promise.all(detailPromises);
        setProducts(completeData);
      } catch (error) {
        console.error('Errore nel fetch della lista prodotti:', error);

      }
    } else {
      // Usa i dati pre-parsati dal database locale
      console.log("Utilizzo i prodotti dal database locale");
      const DBData = [...parsedData.sofas, ...parsedData.tables, ...parsedData.beds];
      setProducts(DBData);
    }
  }

  const updateProduct = async (product, category) => {
    category = category.toLowerCase().includes('divani') ? 'sofas' :
      category.toLowerCase().includes('tavoli') ? 'tables' :
        'beds';
    try {
      fetch(`${apiUrl}/${category}es/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })
        .then(addNotification('Prodotto modificato', `Prodotto modificato con successo`))
        .then(() => fetchAllProducts())
    } catch (error) {
      console.error('Errore nella modifica del prodotto:', error);
      addNotification('Errore di modifica', 'Si è verificato un errore durante la modifica del prodotto.')
    }
  }

  const insertProduct = async (product, category) => {
    category = category.toLowerCase().includes('divani') ? 'sofas' :
      category.toLowerCase().includes('tavoli') ? 'tables' :
        'beds';
    try {
      fetch(`${apiUrl}/${category}es`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })
        .then(addNotification('Prodotto inserito', `Prodotto inserito con successo`))
        .then(() => fetchAllProducts())
    } catch (error) {
      console.error('Errore nell\'inserimento del prodotto:', error);
      addNotification('Errore di inserimento', 'Si è verificato un errore durante l\'inserimento del prodotto.')
    }
  }

  const deleteProduct = async (id, category) => {
    category = category.toLowerCase().includes('divani') ? 'sofas' :
      category.toLowerCase().includes('tavoli') ? 'tables' :
        'beds';
    try {
      fetch(`${apiUrl}/${category}es/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(addNotification('Prodotto eliminato', `Prodotto eliminato con successo`))
        .then(() => fetchAllProducts())
    } catch (error) {
      console.error('Errore nella cancellazione del prodotto:', error);
      addNotification('Errore di cancellazione', 'Si è verificato un errore durante la cancellazione del prodotto.')
    }
  }

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [compareList, setCompareList] = useState(() => {
    const savedCompareList = localStorage.getItem('compareList');
    return savedCompareList ? JSON.parse(savedCompareList) : [];
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [notifications, setNotifications] = useState([]);

  function addNotification(title, message) {
    const newNotification = {
      id: Date.now(), // ID univoco per ogni notifica
      title,
      message
    };
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 2000);
    setNotifications(prev => [...prev, newNotification]);
  };

  function removeNotification(id) {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };


  const handleAddToWishlist = useCallback((product) => {
    if (!wishlist.includes(product)) {
      setWishlist([...wishlist, product]);
      addNotification('Aggiunto alla lista', `${product.title} è stato aggiunto alla wishlist!`);
    } else {
      addNotification('Prodotto gia presente', `${product.title} è già presente nella wishlist!`);
    }
  }, [wishlist, addNotification]);

  const handleAddToCompare = useCallback((product) => {
    if (compareList.length === 5) {
      addNotification('Limite Raggiunto', `Puoi confrontare al massimo 5 prodotti`);
      return;
    }
    if (!compareList.includes(product)) {
      setCompareList([...compareList, product]);
      addNotification('Aggiunto al confronto', `${product.title} è stato aggiunto al confronto`);
    } else {
      addNotification('Prodotto gia presente', `${product.title} è già presente nel confronto`);
    }
  }, [compareList, addNotification]);

  const handleAddToCart = useCallback((product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (!existingProduct) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    }
    addNotification('Aggiunto al carrello', `${product.title} è stato aggiunto al carrello`);
  }, [cart, addNotification]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const values = {
    wishlist,
    setWishlist,
    compareList,
    setCompareList,
    cart,
    setCart,
    handleAddToWishlist,
    handleAddToCompare,
    handleAddToCart,
    notifications,
    addNotification,
    removeNotification,
    products,
    setProducts,
    fetchProducts,
    fetchAllProducts,
    deleteProduct,
    updateProduct,
    insertProduct,
    isUsingAPI,
    setIsUsingAPI
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };