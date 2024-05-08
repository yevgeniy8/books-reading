import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

interface IProps {
  component: React.LazyExoticComponent<React.FC> | React.FC;
  redirectTo?: string;
}

export const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  redirectTo = "/register",
}) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isRefreshing && !isLoggedIn;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};
