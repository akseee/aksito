import { useQuery } from "@tanstack/react-query";
import { api } from "src/api/api";
import { TItemType } from "src/utils/types";

const getItemById = (id: string) => {
  return api.get<TItemType>(`http://localhost:3000/items/${id}`);
};

export function useItem(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getItemById(id),
    select: (data) => data.data,
  });

  return { item: data, isItemLoading: isLoading, error };
}
