import { Preloader } from "@ui";
import { useContext } from "react";

import { Navigate, useLocation } from "react-router";
import { UserContext } from "src/context/UserContext";

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children,
}: ProtectedRouteProps) => {
  const context = useContext(UserContext);

  const location = useLocation();

  if (!context) {
    throw new Error("Protected Route must be used inside of <UserProvider/>");
  }

  const { isAuthChecked, data } = context;

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !data) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  if (onlyUnAuth && data) {
    const from = location.state?.from || { pathname: "/" };

    return <Navigate replace to={from} />;
  }

  return children;
};
