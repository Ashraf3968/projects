import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("electronics_token");
    if (!token) {
      setLoading(false);
      return;
    }

    api.me()
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem("electronics_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const authenticate = async (action, payload) => {
    const data = await action(payload);
    localStorage.setItem("electronics_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const login = (payload) => authenticate(api.login, payload);
  const signup = (payload) => authenticate(api.signup, payload);
  const logout = () => {
    localStorage.removeItem("electronics_token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, signup, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
