import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "@/context/auth-context";

const ADMIN_EMAIL = "info@eduexpoglobal.com";
const ADMIN_PASSWORD = "Eduexpo@2406";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const authStatus = localStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setIsReady(true);
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
