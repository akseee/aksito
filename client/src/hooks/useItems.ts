import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { TItemType } from "src/utils/types";

type TResonseData = {
  items: TItemType[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

const getItemsList = async (page: number, limit: number) => {
  return axios.get<TResonseData>(
    `http://localhost:3000/items?page=${page}&limit=${limit}`
  );
};

export function useItems(page: number, limit: number) {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["items", page],
    queryFn: () => getItemsList(page, limit),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(`fetched success!`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log(`fetched error!`);
    }
  }, [isError]);

  return { data, areItemsLoading: isLoading, error };
}
