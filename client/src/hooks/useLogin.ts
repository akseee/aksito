import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { api } from "src/api/api";
import { UserContext } from "src/context/UserContext";
import { TLoginForm, TUserType } from "src/utils/types";

type TLoginResponse = {
  message: string;
  token: string;
  user: TUserType;
};

const loginUser = async (loginData: TLoginForm) => {
  const response = await api.post<TLoginResponse>("/users/login", loginData);
  return response.data;
};

export function useLogin() {
  const context = useContext(UserContext);
  const { login, logout } = context;

  const { mutate, error } = useMutation({
    mutationKey: ["login user"],
    mutationFn: loginUser,
    onSuccess: (data: TLoginResponse) => {
      login(data.token);
    },
    onError: () => {
      logout();
    },
  });

  return { mutate, error };
}
