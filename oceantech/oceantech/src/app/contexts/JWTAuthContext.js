import React, { createContext, useMemo } from "react";
import axios from "./../axios";
import { API_TOKEN } from "app/constant";
const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("access_token", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common.Authorization;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const login = async (username, password) => {
    const response = await axios.post(
      API_TOKEN,
      {
        clinet_id: "core_client",
        grant_type: "password",
        client_secret: "secret",
        username: username,
        password: password,
      },
      {
        headers: {
          Authorization: "Basic Y29yZV9jbGllbnQ6c2VjcmV0",
        },
      }
    );

    setSession(response?.data?.access_token);
  };

  const memoizedAuthValue = useMemo(
    () => ({
      login,
    }),
    [login]
  );

  return (
    <AuthContext.Provider value={memoizedAuthValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
