import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { ItemType } from "src/utils/types";

const getItemsList = async () => {
  return axios.get<ItemType[]>("http://localhost:3000/items");
};

export function useItems() {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["items"],
    queryFn: getItemsList,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("fetched successfully!");
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.log(`fetched error!`);
    }
  }, [isError]);

  return { items: data, areItemsLoading: isLoading };
}
