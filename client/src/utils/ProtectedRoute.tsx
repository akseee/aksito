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

  const { isAuthChecked, isAuthenticated } = context;

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!isAuthenticated && !onlyUnAuth) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  if (isAuthenticated && onlyUnAuth) {
    const from = location.state?.from || { pathname: "/" };
    return <Navigate replace to={from} />;
  }

  return children;
};
