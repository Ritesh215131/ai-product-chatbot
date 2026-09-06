import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { authApi, productApi } from '../services/api';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const toast = useToast();

  const [savedProductIds, setSavedProductIds] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [activeDetailProduct, setActiveDetailProduct] = useState(null);

  // Sync saved products from user object
  useEffect(() => {
    if (user && user.savedProducts) {
      setSavedProductIds(user.savedProducts);
    } else {
      setSavedProductIds([]);
    }
  }, [user]);

  const toggleSaveProduct = async (productId) => {
    if (!isAuthenticated) {
      toast.info('Please log in to save products to your wishlist.');
      return false;
    }

    try {
      const res = await authApi.toggleSaveProduct(productId);
      setSavedProductIds(res.savedProducts);
      updateUser({ savedProducts: res.savedProducts });
      if (res.isSaved) {
        toast.success('Saved to your wishlist!');
      } else {
        toast.info('Removed from wishlist.');
      }
      return res.isSaved;
    } catch (err) {
      toast.error(err.message || 'Failed to update wishlist.');
      return false;
    }
  };

  const isProductSaved = (productId) => {
    return savedProductIds.includes(productId);
  };

  const addToCompare = (product) => {
    if (!product || !product.id) return;

    if (compareList.some(p => p.id === product.id)) {
      toast.info(`${product.name} is already in comparison tray.`);
      return;
    }

    if (compareList.length >= 4) {
      toast.error('You can compare a maximum of 4 products at a time.');
      return;
    }

    setCompareList(prev => [...prev, product]);
    toast.success(`Added ${product.name} to comparison.`);
  };

  const removeFromCompare = (productId) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const openProductDetail = (product) => {
    setActiveDetailProduct(product);
  };

  const closeProductDetail = () => {
    setActiveDetailProduct(null);
  };

  return (
    <ProductContext.Provider
      value={{
        savedProductIds,
        toggleSaveProduct,
        isProductSaved,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        activeDetailProduct,
        openProductDetail,
        closeProductDetail
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
