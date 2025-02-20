import { FC } from "react";
import styles from "./forms-publish.module.css";
import { ContentWrapper } from "@ui";
import { ItemType } from "src/utils/types";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "src/api/api";
import { ItemForm } from "@components";

export const FormPublishPage: FC = () => {
  const navigate = useNavigate();

  const { mutate, error } = useMutation({
    mutationKey: ["post item"],
    mutationFn: async (item: ItemType) => {
      const response = await api.post("/items", item);
      console.log(response);
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const onSubmit = (data: ItemType) => {
    mutate(data);
  };

  return (
    <ContentWrapper title="Добавьте свое объявление" extraClass={styles.box}>
      <ItemForm
        submitForm={onSubmit}
        isEditing={false}
        error={error}
      ></ItemForm>
    </ContentWrapper>
  );
};
