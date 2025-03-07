import { jwtDecode } from "jwt-decode";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

type TUserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: TUserProviderProps) => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

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
    navigate("/profile");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <UserContext.Provider
      value={{ isAuthChecked, isAuthenticated, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
