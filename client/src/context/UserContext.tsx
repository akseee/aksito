import { createContext, ReactNode, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type InitialState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

type contextProps = {
  children: ReactNode;
};

const UserContext = createContext<InitialState>({
  isAuthChecked: false,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const UserProvider = ({ children }: contextProps) => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decoded = jwtDecode<{ exp: number }>(token);
        if (decoded.exp * 1000 < Date.now()) {
          throw new Error("Token expired");
        }
        setIsAuthenticated(true);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("authToken");
      }
    }
    setIsAuthChecked(true);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{ isAuthChecked, isAuthenticated, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
