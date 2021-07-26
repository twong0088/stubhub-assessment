export const addToCart = (item) => {
  return {
    type: 'ADD TO CART',
    payload: item
  }
};

export const updateCart = (cart) => {
  return {
    type: 'UPDATE CART',
    payload: cart
  }
}

export const removeFromCart = (idx) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: idx
  };
};

export const clearCart = () => {
  return {
    type: 'CLEAR_CART'
  }
};