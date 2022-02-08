import { useUser } from "context/userContext";
import React from "react";

const PrivateComponent = ({ rolList, children }) => {
  const { userData } = useUser();
  if (rolList.includes(userData.rol)) {
    return children;
  }

  return <></>;
};

export default PrivateComponent;
