import React from 'react'
import { useGlobalContext } from 'Contexts/GlobalContext'

const Cart = () => {
  const { cart, setCart, addNotification } = useGlobalContext()

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cart.filter(item => item !== itemToRemove);
    setCart(updatedCart);
    addNotification("Rimosso dal carrello", `${itemToRemove.title} è stato rimosso dal carrello`)
  };

  if (cart.length > 0) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
      <div className="container py-12">
        <div className="category-header text-center text-4xl font-semibold mb-8">
          <h1>Carrello</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-0 p-4 text-gray-500">Rimuovi</th>
                <th className="border-0 p-4">Immagine</th>
                <th className="border-0 p-4">Prodotto</th>
                <th className="border-0 p-4">Prezzo</th>
                <th className="border-0 p-4">Quantità</th>
                <th className="border-0 p-4">Totale</th>
                <th className="border-0 p-4"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border-0 p-4">
                    <button
                      onClick={() => removeFromCart(item)}
                      className="w-8 h-8 text-xs font-bold text-red-500 hover:text-red-700 p-2 rounded-full cursor-pointer hover:bg-red-100 transition-colors"
                    >
                      ✕
                    </button>
                  </td>
                  <td className="border-0 p-4">
                    <img src={`/imgs/products/${item.image}`} alt={item.name} className="mx-auto w-20 h-20 object-contain" />
                  </td>
                  <td className="border-0 p-4">{item.name}</td>
                  <td className="border-0 p-4 font-semibold">{item.price}€</td>
                  <td className="border-0 p-4">
                    <div className="flex items-center justify-center">
                      <button
                        className="w-8 h-8 flex justify-center items-center border rounded-full p-2 mr-2 hover:bg-gray-500 hover:text-white cursor-pointer relative group"
                        onClick={() => {
                          const updatedCart = cart.map(cartItem => {
                            if (cartItem === item) {
                              return {
                                ...cartItem,
                                quantity: Math.max(1, cartItem.quantity - 1)
                              };
                            }
                            return cartItem;
                          });
                          setCart(updatedCart);
                        }}>
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        className="w-8 h-8 flex justify-center items-center border rounded-full p-2 ml-2 hover:bg-gray-500 hover:text-white cursor-pointer relative group"
                        onClick={() => {
                          const updatedCart = cart.map(cartItem => {
                            if (cartItem === item) {
                              return {
                                ...cartItem,
                                quantity: cartItem.quantity + 1
                              };
                            }
                            return cartItem;
                          });
                          setCart(updatedCart);
                        }}>
                        +
                      </button>
                    </div>
                  </td>
                  <td className="border-0 p-4 font-bold">{(item.price * item.quantity).toFixed(2)}€</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="container mt-8 text-right pr-4">
            <p className="text-lg">
              Totale articoli: <span className="font-semibold">{totalItems}</span>
            </p>
            <p className="text-xl mt-2">
              Totale carrello: <span className="font-bold">{totalPrice.toFixed(2)}€</span>
            </p>
          </div>
          <div className="flex flex-col items-end justify-end py-8 container">
            <button className="bg-blue-600 cursor-pointer text-white text-lg font-semibold py-2 px-4 rounded-2xl hover:bg-gray-900 transition-colors">
              Paga ora
            </button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container flex flex-col justify-center items-center py-12">
        <h1 className="text-4xl font-semibold">Carrello vuoto</h1>
        <p>Devi aggiungere degli articoli al carrello per vederli qui</p>
      </div>
    )
  }
}

export default Cart