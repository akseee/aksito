import { FC } from "react";
import styles from "./form.module.css";
import { ContentWrapper } from "@ui";
import { ItemType } from "src/utils/types";

import { useNavigate, useParams } from "react-router-dom";
import { api } from "src/api/api";
import { useMutation } from "@tanstack/react-query";
import { useItem } from "src/hooks/useItem";
import { ItemForm } from "@components";

export const FormEditPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { item } = useItem(id ?? "");

  const navigate = useNavigate();

  const { mutate: mutateEdit, error } = useMutation({
    mutationKey: ["post item"],
    mutationFn: async (item: ItemType) => {
      const response = await api.put(`/items/${id}`, item);
      console.log(response);
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const { mutate: mutateDeletion } = useMutation({
    mutationKey: ["delete item"],
    mutationFn: async () => {
      const response = await api.delete(`/items/${id}`);
      console.log(response);
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const onSubmit = (data: ItemType) => {
    mutateEdit(data);
  };

  const onDelete = () => {
    mutateDeletion();
  };

  return (
    <ContentWrapper
      title={`Редактируйте свое объявление: "${item?.name}"`}
      extraClass={styles.box}
    >
      <ItemForm
        submitForm={onSubmit}
        deleteItem={onDelete}
        error={error}
        item={item}
        isEditing={true}
      ></ItemForm>
    </ContentWrapper>
  );
};
