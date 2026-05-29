'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from './data';
import toast from 'react-hot-toast';

interface CartItem extends Product {
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
  isInCart: (id: number) => boolean;
  cartCount: number;
  cartTotal: number;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (v: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    return JSON.parse(localStorage.getItem(key) || '') as T;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCart(readStorage('umuvumu-cart', []));
      setWishlist(readStorage('umuvumu-wishlist', []));
      setHasLoadedStorage(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    localStorage.setItem('umuvumu-cart', JSON.stringify(cart));
  }, [cart, hasLoadedStorage]);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    localStorage.setItem('umuvumu-wishlist', JSON.stringify(wishlist));
  }, [wishlist, hasLoadedStorage]);

  const addToCart = (product: Product) => {
    const existsInCart = cart.some(item => item.id === product.id);

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    toast.success(existsInCart ? `${product.name.substring(0, 25)} quantity updated` : 'Added to cart', {
      icon: existsInCart ? 'Cart' : 'Added',
      style: { borderRadius: '12px', fontFamily: 'Inter' },
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.success('Removed from cart', { icon: 'Remove', style: { borderRadius: '12px', fontFamily: 'Inter' } });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const toggleWishlist = (product: Product) => {
    const existsInWishlist = wishlist.some(p => p.id === product.id);

    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });

    toast.success(existsInWishlist ? 'Removed from wishlist' : 'Added to wishlist', { icon: 'Heart', style: { borderRadius: '12px', fontFamily: 'Inter' } });
  };

  const isInWishlist = (id: number) => wishlist.some(p => p.id === id);
  const isInCart = (id: number) => cart.some(item => item.id === id);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider value={{
      cart, wishlist, addToCart, removeFromCart, updateQuantity,
      toggleWishlist, isInWishlist, isInCart, cartCount, cartTotal, clearCart,
      isCartOpen, setIsCartOpen, isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}
