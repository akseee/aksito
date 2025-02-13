import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ItemType } from "src/utils/types";

const getItemById = (id: number) => {
  return axios.get<ItemType>(`http://localhost:3000/items/${id}`);
};

export function useItem(id: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getItemById(id),
    select: (data) => data.data,
  });

  return { item: data, isItemLoading: isLoading };
}
