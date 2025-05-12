import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
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

  const handleAddToWishlist = (product) => {
    if (!wishlist.includes(product)) {
      setWishlist([...wishlist, product]);
    }
  }

  const handleAddToCompare = (product) => {
    if (compareList.length === 5) {
      alert("Puoi confrontare al massimo 5 prodotti");
      return;
    }
    if (!compareList.includes(product)) {
      setCompareList([...compareList, product]);
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
    handleAddToCart
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };