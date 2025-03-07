import { useQuery } from "@tanstack/react-query";
import { api } from "src/api/api";
import { TUserType } from "src/utils/types";

const getUserById = (id: number) => {
  return api.get<TUserType>(`http://localhost:3000/users/${id}`);
};

export function useUser(id: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    select: (data) => data.data,
  });

  return { user: data, isLoading };
}
