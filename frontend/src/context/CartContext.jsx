import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, quantity) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.productId === product._id && item.size === size
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          size,
          quantity,
        },
      ]);
    }
  };

  const removeFromCart = (productId, size) => {
    setCartItems(cartItems.filter(
      item => !(item.productId === productId && item.size === size)
    ));
  };

  const updateQuantity = (productId, size, quantity) => {
    setCartItems(
      cartItems.map(item =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};