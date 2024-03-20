import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const AdminProtected = ({ children }) => {
  const { auth } = useAuth();

  return (
    <Protected>
      {auth?.role === "ROLE_ADMIN" ? (
        children
      ) : (
        <Navigate to={"/403"} replace />
      )}
    </Protected>
  );
};


const  CheckRole = () => {
  const {auth} = useAuth()
  if(auth?.role === "ROLE_ADMIN") return <Navigate to={"/dashboard"} replace/>
  else if(auth?.role === "ROLE_STAFF") return <Navigate to={"/staff-dashboard/viewRegisterList"} replace/>
  else return  <Navigate to={"/"} replace/>
}

export const  UnAuthenticated = ({children}) => {
  const {auth} = useAuth()

  return (!auth?.accessToken  ? children : <CheckRole/>)
}

export const StaffProtected = ({ children }) => {
  const { auth } = useAuth();

  return (
    <Protected>
      {auth?.role === "ROLE_STAFF" ? (
        children
      ) : (
        <Navigate to={"/403"} replace />
      )}
    </Protected>
  );
};

export const Protected = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation().pathname;

  return auth?.accessToken ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};
