let initState = [];

const cartReducer = (state = initState, action) => {
  switch(action.type) {
    case 'ADD TO CART': {
      return [...state, action.payload];
    }
    case 'REMOVE FROM CART': {
      const updatedCart = [...state];
      updatedCart.splice(action.idx, 1);
      return updatedCart;
    }
    case 'CLEAR CART': {
      return [];
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;
