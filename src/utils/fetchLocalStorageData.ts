export const fetchCart = () => {
  const cartInfoString = localStorage.getItem("cartitems");
  const cartInfo =
    cartInfoString && cartInfoString !== "undefined"
      ? JSON.parse(cartInfoString)
      : null;

  return Array.isArray(cartInfo) ? cartInfo : [];
};
