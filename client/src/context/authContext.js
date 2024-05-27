import { createContext, useState, useEffect } from "react";
import { makeRequest } from "../axios";

export const AuthContext = createContext("");

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (input) => {
    // withCredentials is needed because we are using cookies
    const res = await makeRequest.post("/auth/login", input, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  const logout = () => {
    setCurrentUser(!currentUser);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
