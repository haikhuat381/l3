import { Navigate, useLocation } from "react-router-dom";
import axios from "./../axios";

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  const { pathname } = useLocation();

  return (
    <>
      {token ? (
        children
      ) : (
        <Navigate replace to="/session/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
