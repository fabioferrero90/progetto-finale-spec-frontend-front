import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";

const GlobalContext = createContext();
const apiUrl = import.meta.env.VITE_APP_API_URL

const GlobalProvider = ({ children }) => {

  const [products, setProducts] = useState([]);

  const fetchProducts = async (category) => {
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
  };

  const fetchAllProducts = async () => {
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

  function addNotification(title, message){
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

  function removeNotification(id){
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
    fetchAllProducts
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };