const initialState = {
  isAuthenticated: false,
  userRole: null,
  // ...existing code...
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        userRole: action.payload.role,
        // ...existing code...
      };
    // ...existing code...
    default:
      return state;
  }
};

export default authReducer;
