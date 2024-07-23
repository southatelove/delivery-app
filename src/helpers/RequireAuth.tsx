import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  // const jwt = localStorage.getItem("jwt");
  const jwt = useSelector((s: RootState) => s.user.jwt);

  if (!jwt) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};
