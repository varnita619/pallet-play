import { createContext, useContext } from "react";
import { useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const getToken = localStorage.getItem("login-Token");
    const getUserDetails = localStorage.getItem("user");

    const [token, setToken] = useState(getToken || "");
    const [user, setUser] = useState(getUserDetails || "");

    const userLogout = ()=>{
        setToken("");
        setUser("");
        localStorage.removeItem("login-Token");
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ token, setToken, setUser, user, userLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthContextProvider }
