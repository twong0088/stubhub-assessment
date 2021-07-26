let initState = [];

const cartReducer = (state = initState, action) => {
  switch(action.type) {
    case 'ADD TO CART': {
      return [...state, action.payload];
    }
    case 'REMOVE FROM CART': {
      const updatedCart = [...state];
      updatedCart.splice(action.payload, 1);
      return updatedCart;
    }
    case 'CLEAR CART': {
      return [];
    }
    case 'UPDATE CART': {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;
