import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { TItemType } from "src/utils/types";

type TResponseData = {
  items: TItemType[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

const getItemsList = async (
  page: number,
  limit: number,
  query: string,
  category: string
) => {
  try {
    const response = await axios.get<TResponseData>(
      `http://localhost:3000/items?page=${page}&limit=${limit}&query=${query}&category=${category}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Ошибка загрузки данных"
      );
    }
    throw new Error("Ошибка загрузки данных");
  }
};

export function useItems(
  page: number,
  limit: number,
  query: string,
  category: string
) {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["items", page, limit, query, category],
    queryFn: () => getItemsList(page, limit, query, category),
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
