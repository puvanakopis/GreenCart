import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);

  const [cartItems, setCartItems] = useState({});


  // Fetch All Products
  const fetchProducts = async () => {
    setProducts(dummyProducts)
  };

  // Add a product to the cart
  const addToCart = (itemId) => {
    let carData = structuredClone(cartItems)

    if (carData[itemId]) {
      carData[itemId] += 1;
    }
    else {
      carData[itemId] = 1;
    }
    setCartItems(carData);
    toast.success("Added to cart successfully")
  };


  //Update Cart Item Count
  const updateCartItem = (itemId, quantity) => {
    let carData = structuredClone(cartItems);
    carData[itemId] = quantity;
    setCartItems(carData);
    toast.success("Cart updated successfully");
  };


  //Remove an item from the cart
  const removeFromCart = (itemId) => {
    let carData = structuredClone(cartItems);
    if (carData[itemId]) {
      carData[itemId] -= 1;
      if (carData[itemId] === 0) {
        delete carData[itemId];
      }
    }
    toast.success("Item removed from cart")
    setCartItems(carData);
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    setProducts,
    currency,
    cartItems,
    setCartItems,
    addToCart,
    updateCartItem,
    removeFromCart
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};