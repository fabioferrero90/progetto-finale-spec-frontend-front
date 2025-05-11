import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { useGlobalContext } from "../../../Contexts/GlobalContext";

const ProductCard = ({ product, isWishlist }) => {

  const { wishlist, setWishlist } = useGlobalContext();
  const { cart, setCart } = useGlobalContext();
  const { compareList, setCompareList } = useGlobalContext();

  const handleAddToCart = () => {
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

  const handleAddToWishlist = () => {
    if (!wishlist.includes(product)) {
      setWishlist([...wishlist, product]);
    }
  }

  const handleAddToCompare = () => {
    if (!compareList.includes(product)) {
      setCompareList([...compareList, product]);
    }
  }

  return (
    <div className="product-card flex flex-col">
      <div className="product-image mb-4 bg-gray-100 rounded">
        <img 
          src={`/src/assets/imgs/products/${product.image}`} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-name font-bold uppercase text-sm">{product.name}</h3>
        <p className="product-description text-sm text-gray-600">{product.description || "Materasso in schiuma, rigido/bianco, 90x200 cm"}</p>
        
        <div className="product-price mt-2">
          <span className="text-2xl font-bold">{product.price}€</span>
        </div>
        
        <div className="product-rating flex items-center mt-1">
          <div className="stars flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">({parseInt(Math.random()*300)})</span>
        </div>
        
        <div className="product-actions flex mt-3">
          <button 
            className="w-10 h-10 flex justify-center items-center bg-blue-600 text-white rounded-full p-2 mr-2 hover:bg-blue-900 cursor-pointer relative group"
            title="Aggiungi al carrello"
            onClick={handleAddToCart}
          >
            <FiShoppingCart />
            <span className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">Aggiungi al carrello</span>
          </button>
          {!isWishlist && (
            <button 
              className="w-10 h-10 flex justify-center items-center border rounded-full p-2 mr-2 hover:bg-red-600 hover:text-white cursor-pointer relative group"
              title="Aggiungi ai preferiti"
              onClick={handleAddToWishlist}
            >
              <FaRegHeart />
              <span className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">Aggiungi ai preferiti</span>
            </button>
          )}
          <button 
            className="w-10 h-10 flex justify-center items-center border rounded-full p-2 mr-2 hover:bg-gray-500 hover:text-white cursor-pointer relative group"
            title="Confronta"
            onClick={handleAddToWishlist}
          >
            <MdCompareArrows />
            <span className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">Confronta</span>
          </button>
          {isWishlist && (
            <button 
            className="w-10 h-10 flex justify-center items-center border rounded-full p-2 mr-2 hover:bg-red-600 hover:text-white cursor-pointer relative group"
            title="Rimuovi dai preferiti"
            onClick={() => setWishlist(wishlist.filter(item => item.id !== product.id))}
          >
            <IoHeartDislikeOutline />
            <span className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">Rimuovi dai Preferiti</span>
          </button>
          )}
        </div>
        
        <div className="product-availability mt-4">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Disponibile per la consegna</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);