const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      };
    case 'DECRYPT_TOKEN_SUCCESS':
      return {
        ...state,
        user: action.payload,
      };
    case 'DECRYPT_TOKEN_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    // ...existing code...
    default:
      return state;
  }
}
