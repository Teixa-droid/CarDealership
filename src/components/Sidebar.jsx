import React from "react";
import LogoImage from "./LogoImage";
import { Link } from "react-router-dom";
import useActiveRoute from "hooks/useActiveRoute";

const Sidebar = () => {
  return (
    <nav className="hidden sm:flex sm:w-72 border border-gray-300 h-full flex-col bg-gray-200 p-4 sidebar">
      <Link to="/admin">
        <LogoImage />
      </Link>
      <div className="my-4">
        <Route icon="fas fa-user" route="/admin/profile" name="Profile" />
        <Route icon="fas fa-car" route="/admin/vehicles" name="Vehicles" />
        <Route icon="fas fa-cash-register" route="/admin/sales" name="Sales" />
        <Route icon="fas fa-users" route="/admin/users" name="Users" />
      </div>
      <button>Exit</button>
    </nav>
  );
};

const Route = ({ icon, route, name }) => {
  const isActive = useActiveRoute(route);
  return (
    <Link to={route}>
      <button
        className={`p-1 my-2 bg-${
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
