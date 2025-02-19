import { Button } from "@ui";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "src/context/UserContext";

export const ProfilePage: FC = () => {
  const navigate = useNavigate();

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext error");
  }
  const { logout } = context;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Профиль</h2>
      <Button htmlType="button" onClick={handleLogout}>
        Выйти из аккаунта
      </Button>
    </div>
  );
};
