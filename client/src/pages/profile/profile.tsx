import { ContentWrapper, Preloader } from "@ui";
import { jwtDecode } from "jwt-decode";
import { FC } from "react";
import { useUser } from "src/hooks/useUser";
import { ProfileView } from "@components";
import { TItemType } from "src/utils/types";
import { useQuery } from "@tanstack/react-query";
import { api } from "src/api/api";

const getUserItemsData = (id: number) => {
  return api.get<TItemType[]>(`http://localhost:3000/user/items/${id}`);
};

function useUserItems(id: number) {
  const { data } = useQuery({
    queryKey: ["user items", id],
    queryFn: () => getUserItemsData(id),
    select: (data) => data.data,
  });
  return { items: data };
}

export const ProfilePage: FC = () => {
  const token = localStorage.getItem("authToken");

  const { userId } = jwtDecode<{ userId: number }>(token!);

  const { user } = useUser(userId);
  const { items } = useUserItems(userId);

  return (
    <ContentWrapper title="Профиль">
      {user && items ? (
        <ProfileView user={user} items={items}></ProfileView>
      ) : (
        <Preloader />
      )}
    </ContentWrapper>
  );
};
