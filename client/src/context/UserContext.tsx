import { createContext, ReactNode, useEffect, useState } from "react";

export type userType = {
  id: number;
  password: string;
  email: string;
};

type InitialState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  login: (userData: userType) => void;
  logout: () => void;
  data: null | userType;
};

const initialState: InitialState = {
  isAuthChecked: false,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  data: null,
};

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<InitialState | null>(null);

const UserProvider = ({ children }: UserProviderProps) => {
  const [state, setState] = useState<InitialState>(initialState);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setState((prevState) => ({
        ...prevState,
        isAuthChecked: true,
        isAuthenticated: true,
        data: JSON.parse(savedUser),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isAuthChecked: true,
      }));
    }
  }, []);

  const login = (userData: userType) => {
    setState({
      ...state,
      isAuthenticated: true,
      data: userData,
    });
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setState({
      ...state,
      isAuthenticated: false,
      data: null,
    });
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ ...state, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
