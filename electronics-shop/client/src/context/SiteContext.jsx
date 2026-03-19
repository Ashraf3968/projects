import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";

const SiteContext = createContext(null);

export const SiteProvider = ({ children }) => {
  const [state, setState] = useState({ loading: true, error: "", data: null });

  const refresh = async () => {
    try {
      setState((current) => ({ ...current, loading: true, error: "" }));
      const data = await api.bootstrap();
      setState({ loading: false, error: "", data });
    } catch (error) {
      setState({ loading: false, error: error.message, data: null });
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return <SiteContext.Provider value={{ ...state, refresh }}>{children}</SiteContext.Provider>;
};

export const useSite = () => useContext(SiteContext);
