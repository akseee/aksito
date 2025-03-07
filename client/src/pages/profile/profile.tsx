import { ContentWrapper, Preloader } from "@ui";
import { jwtDecode } from "jwt-decode";
import { FC } from "react";
import { useUser } from "src/hooks/useUser";
import { ProfileView } from "@components";

export const ProfilePage: FC = () => {
  const token = localStorage.getItem("authToken");

  const { userId } = jwtDecode<{ userId: number }>(token!);
  const { user } = useUser(userId);

  return (
    <ContentWrapper title="Профиль">
      {user ? <ProfileView user={user}></ProfileView> : <Preloader />}
    </ContentWrapper>
  );
};
