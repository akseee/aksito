import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { api } from "src/api/api";
import { UserContext } from "src/context/UserContext";
import { TUserType } from "src/utils/types";

const getUserById = (id: number) => {
  return api.get<TUserType>(`http://localhost:3000/users/${id}`);
};

export function useUser(id: number) {
  const context = useContext(UserContext);
  const { logout } = context;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    select: (data) => data.data,
  });

  if (isError) {
    logout();
  }
  return { user: data, isLoading };
}
