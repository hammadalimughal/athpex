import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

const INITIAL_CART_ITEMS = [
  {
    id: 1,
    name: 'Atomic Blast Pre-Workout',
    flavor: 'Sour Apple Burst / 30 Servings',
    price: 39.99,
    quantity: 2,
    image: '/images/pre-workout.png',
  },
  {
    id: 2,
    name: 'The Starter Stack',
    flavor: 'Pre-Workout + Shaker Cup',
    price: 49.99,
    quantity: 1,
    image: '/images/featured-stack/1.png',
  },
  {
    id: 3,
    name: 'Essential Performance Stack',
    flavor: 'Ultimate Training Bundle',
    price: 79.99,
    quantity: 1,
    image: '/images/featured-stack/2.png',
  },
];

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setPromoError('Please enter a coupon code.');
      setPromoSuccess('');
      return;
    }
    if (cleanCode === 'ATHPEX10' || cleanCode === 'ATHPEX') {
      setDiscountPercent(10);
      setPromoSuccess('10% discount applied successfully!');
      setPromoError('');
    } else if (cleanCode === 'PROMO20') {
      setDiscountPercent(20);
      setPromoSuccess('20% discount applied successfully!');
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try ATHPEX10');
      setPromoSuccess('');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 5.99;
  const tax = subtotal > 0 ? (subtotal - discount) * 0.08 : 0;
  const total = subtotal > 0 ? subtotal - discount + shipping + tax : 0;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        updateQuantity,
        removeItem,
        promoCode,
        setPromoCode,
        discountPercent,
        promoError,
        promoSuccess,
        applyPromoCode,
        subtotal,
        discount,
        shipping,
        tax,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
