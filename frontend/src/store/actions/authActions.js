export const loginRequest = (email, password) => ({
  type: "LOGIN_REQUEST",
  payload: { email, password },
});

export const loginSuccess = (token, role) => ({
  type: "LOGIN_SUCCESS",
  payload: { token, role },
});

export const logout = () => ({
  type: "LOGOUT",
});
