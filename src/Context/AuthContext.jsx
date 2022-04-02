import { createContext, useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const getToken = localStorage.getItem("login-token");
  const getUserDetails = JSON.parse(localStorage.getItem("user"));

  const [token, setToken] = useState(getToken || "");
  const [user, setUser] = useState(getUserDetails || "");

  useEffect(() => {
    setToken(getToken);
    setUser(getUserDetails);
  }, []);

  const userLogout = () => {
    setToken("");
    setUser("");
    localStorage.removeItem("login-token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, setUser, user, userLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthContextProvider };
