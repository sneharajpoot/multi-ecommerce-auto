const initialState = {
  isAuthenticated: false,
  userRole: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        userRole: action.payload.role,
        token: action.payload.token,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
