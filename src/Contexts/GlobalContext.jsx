import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

const GlobalContext = createContext();
const apiUrl = import.meta.env.VITE_APP_API_URL


const GlobalProvider = ({ children }) => {

  const [products, setProducts] = useState([]);

  const fetchProducts = async (category) => {
    const response = await fetch(`${apiUrl}/${category}`);
    const data = await response.json();
    let promises = [];
    data.map(prod => {
      promises.push(fetch(`${apiUrl}/${category}/${prod.id}`))
    })
    const completeResponse = await Promise.all(promises)
    let completeData = []
    for (let prod in completeResponse){
      completeData.push(
        (await completeResponse[prod].json())[category.slice(0, category.length-2)]
      )
    }
    setProducts(completeData);
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
      setProducts([...sofaData, ...tableData, ...bedData]);
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


  const handleAddToWishlist = (product) => {
    if (!wishlist.includes(product)) {
      setWishlist([...wishlist, product]);
      addNotification('Aggiunto alla lista', `${product.title} è stato aggiunto alla wishlist!`);
    } else {
      addNotification('Prodotto gia presente', `${product.title} è già presente nella wishlist!`);
    }
  }

  const handleAddToCompare = (product) => {
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

  }

  const handleAddToCart = (product) => {
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
  }

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