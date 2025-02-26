import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ItemType } from "src/utils/types";

const getItemById = (id: string) => {
  return axios.get<ItemType>(`http://localhost:3000/items/${id}`);
};

export function useItem(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getItemById(id),
    select: (data) => data.data,
  });

  return { item: data, isItemLoading: isLoading, error };
}
