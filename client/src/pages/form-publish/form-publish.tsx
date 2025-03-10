import { FC } from "react";
import styles from "./forms-publish.module.css";
import { ContentWrapper } from "@ui";
import { TItemType } from "src/utils/types";

import { ItemForm } from "@components";
import { usePublishItem } from "src/hooks/usePublishItem";
import { jwtDecode } from "jwt-decode";

export const FormPublishPage: FC = () => {
  const token = localStorage.getItem("authToken");
  const { userId } = jwtDecode<{ userId: number }>(token!);

  const { mutate, error } = usePublishItem();

  const onSubmit = (data: TItemType) => {
    mutate({ ...data, owner_id: userId });
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
