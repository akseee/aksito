import { FC, useContext } from "react";
import { AppHeaderUI } from "../ui";
import { UserContext } from "src/context/UserContext";

export const AppHeader: FC = () => {
  const data = useContext(UserContext);

  return <AppHeaderUI user={data?.isAuthenticated || false} />;
};
