import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

// Create a context for the VDial application
const VDialContext = createContext({});

// Provider component for the VDialContext
export const VDialProvider = ({ children }) => {
  // Global States
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  // Increase Quantity selected
  const qtyIncrement = () => setQty((prevQty) => prevQty + 1);


  // Decrease Quantity selected
  const qtyDecrement = () =>
    setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));

  // Add product to cart
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((initialPrice) => initialPrice + product.price * quantity);
    setTotalQuantities((initialQuantity) => initialQuantity + quantity);

    if (checkProductInCart) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem._id === product._id
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      );
      setCartItems(updatedCart);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${quantity} ${product.name} added to cart`);
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    const removedItem = cartItems.find((item) => item._id === id);

    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    setTotalQuantities((initialQty) => initialQty - removedItem.quantity);
    setTotalPrice(
      updatedCart.reduce((init, item) => init + item.price * item.quantity, 0)
    );
  };

  // Provide the VDialContext values to the components
  const contextValues = {
    showCart,
    setShowCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    qtyDecrement,
    qtyIncrement,
    onAdd,
    removeFromCart,
  };

  return <VDialContext.Provider value={contextValues}>{children}</VDialContext.Provider>;
};

// Custom hook to use the VDialContext
export const useVDialContext = () => useContext(VDialContext);
