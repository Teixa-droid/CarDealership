import { useUser } from "context/userContext";
import React from "react";

const PrivateRoute = ({ rolList, children }) => {
  const { userData } = useUser();
  if (rolList.includes(userData.rol)) {
    return children;
  }

  return <div className="text-9xl text-red-500 "> You are not authorized to view this site. </div>;
};

export default PrivateRoute;

