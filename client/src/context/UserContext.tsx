import { createContext } from "react";

type InitialState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export const UserContext = createContext<InitialState>({
  isAuthChecked: false,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});
