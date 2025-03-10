import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "src/api/api";
import { TItemType } from "src/utils/types";

export function usePublishItem() {
  const navigate = useNavigate();

  const { mutate, error } = useMutation({
    mutationKey: ["post item"],
    mutationFn: async (item: TItemType) => {
      const response = await api.post("/items", item);
      console.log(response);
    },
    onSuccess: () => {
      navigate("/");
    },
  });
  return { mutate, error };
}
