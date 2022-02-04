import React from "react";
import LogoImage from "./LogoImage";
import { Link } from "react-router-dom";
import useActiveRoute from "hooks/useActiveRoute";

const Sidebar = () => {
  return (
    <nav className="hidden lg:flex lg:w-72 border border-gray-300 h-full flex-col bg-gray-200 p-4 sidebar">
      <Link to="/admin">
        <LogoImage />
      </Link>
      <div className="my-4">
        <Rota icon="fas fa-user" rota="/admin/profile" name="Profile" />
        <Rota icon="fas fa-car" rota="/admin/vehicles" name="Vehicles" />
        <Rota icon="fas fa-cash-register" rota="/admin/sales" name="Sales" />
        <Rota icon="fas fa-users" rota="/admin/users" name="Users" />
      </div>
      <button>Exit</button>
    </nav>
  );
};

const Rota = ({ icon, rota, name }) => {
  const isActive = useActiveRoute(rota);
  return (
    <Link to={rota}>
      <button
        className={`p-1 my-2  bg-${
          isActive ? 'indigo' : 'gray'
        }-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md`}
      >
        <i className={`${icon} w-10`} />
        {name}
      </button>
    </Link>
  );
};

export default Sidebar;
