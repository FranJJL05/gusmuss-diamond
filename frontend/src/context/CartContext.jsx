import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Intenta recuperar de localStorage
    const saved = localStorage.getItem('cart');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Validar que los items del carrito tengan la nueva estructura (cartId)
            // Si el primer elemento no tiene cartId, es una versión antigua de la web. Limpiamos.
            if (parsed.length > 0 && !parsed[0].cartId) {
                return [];
            }
            return parsed;
        } catch(e) {
            return [];
        }
    }
    return [];
  });

  // Cada vez que cartItems cambia, guarda en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedTalla = null, cantidad = 1) => {
    setCartItems(prev => {
      const cartId = product.id + (selectedTalla ? '-' + selectedTalla : '');
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) {
        return prev.map(item => {
          if (item.cartId === cartId) {
             const newQuantity = item.cantidad + cantidad;
             // Limitar al stock máximo
             return { ...item, cantidad: newQuantity > item.stock ? item.stock : newQuantity };
          }
          return item;
        });
      }
      return [...prev, { 
        cartId,
        productId: product.id, 
        talla: selectedTalla,
        cantidad: cantidad > product.stock ? product.stock : cantidad,
        nombre: product.nombre,
        precioUnitario: product.precio,
        precioFormateado: product.precioFormateado,
        imagen: product.imagen,
        slug: product.slug,
        stock: product.stock
      }];
    });
  };

  const updateQuantity = (cartId, cantidad) => {
    if (cantidad < 1) {
      removeFromCart(cartId);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.cartId === cartId) {
         // Capping at item.stock
         const cappedQuantity = cantidad > item.stock ? item.stock : cantidad;
         return { ...item, cantidad: cappedQuantity };
      }
      return item;
    }));
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
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
