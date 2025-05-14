import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let updatedItems;

      if (existingItemIndex > -1) {
        updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      } else {
        updatedItems = [
          ...state.items,
          { ...action.payload, quantity: 1 },
        ];
      }

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: action.payload.quantity,
          };
        }
        return item;
      });
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

function calculateTotal(items) {
  return items.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        Object.keys(cartReducer(initialState, { type: '' })).forEach(key => {
          if (!(key in parsedCart)) {
            throw new Error(`Invalid cart data: missing ${key}`);
          }
        });
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to load cart:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: itemId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    items: state.items,
    total: state.total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount: state.items.reduce((count, item) => count + item.quantity, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
} 