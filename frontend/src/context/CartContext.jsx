import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Intenta recuperar de localStorage
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Cada vez que cartItems cambia, guarda en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, cantidad = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => 
          item.productId === product.id 
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { 
        productId: product.id, 
        cantidad,
        nombre: product.nombre,
        precioUnitario: product.precio,
        precioFormateado: product.precioFormateado,
        imagen: product.imagen,
        slug: product.slug
      }];
    });
  };

  const updateQuantity = (productId, cantidad) => {
    if (cantidad < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.productId === productId ? { ...item, cantidad } : item
    ));
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.cantidad, 0);
  // Precio está en céntimos
  const subtotalCents = cartItems.reduce((acc, item) => acc + (item.precioUnitario * item.cantidad), 0);
  const subtotalFormatted = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(subtotalCents / 100);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, updateQuantity, removeFromCart, clearCart, totalItems, subtotalCents, subtotalFormatted
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
