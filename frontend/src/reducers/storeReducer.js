const initialState = {
  stores: []
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_STORES':
      return { ...state, stores: action.payload };
    case 'ADD_STORE':
      return { ...state, stores: [...state.stores, action.payload] };
    case 'UPDATE_STORE':
      return {
        ...state,
        stores: state.stores.map(store =>
          store.id === action.payload.id ? action.payload : store
        )
      };
    default:
      return state;
  }
};

export default storeReducer;
