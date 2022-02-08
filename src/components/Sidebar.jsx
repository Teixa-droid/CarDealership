import React from "react";
import LogoImage from "./LogoImage";
import { Link } from "react-router-dom";
import useActiveRoute from "hooks/useActiveRoute";
import { useAuth0 } from "@auth0/auth0-react";
import PrivateComponent from "./PrivateComponent";

const Sidebar = () => {
  const { user, logout } = useAuth0();
  const logOff = () => {
    logout({ returnTo: "http://localhost:3000/admin" })
    localStorage.setItem('token',null);
  };
  return (
    <nav className="hidden lg:flex lg:w-72 border border-gray-300 h-full flex-col bg-gray-200 p-4 sidebar">
      <Link to="/admin">
        <LogoImage />
      </Link>
      <div className="my-4">
        <Rota icon="fas fa-user" rota="/admin/profile" name="Profile" user={user} />
        <PrivateComponent rolList={["admin", "seller"]}> 
        <Rota icon="fas fa-car" rota="/admin/vehicles" name="Vehicles" />
        </PrivateComponent>
        <PrivateComponent rolList={["admin"]}>         
        <Rota icon="fas fa-cash-register" rota="/admin/sales" name="Sales" />
        </PrivateComponent>
        <PrivateComponent rolList={["admin"]}> 
        <Rota icon="fas fa-users" rota="/admin/users" name="Users" />
        </PrivateComponent>
      </div>
      <button onClick={() => logOff()}>
        Exit
      </button>
    </nav>
  );
};

const Rota = ({ icon, rota, name, user }) => {
  const isActive = useActiveRoute(rota);
  return (
    <Link to={rota}>
      <button
        className={`p-1 my-2  bg-${
          isActive ? 'indigo' : 'gray'
        }-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md`}
      >
        {user ? (
          <>
          <img src={user.picture} className='h-5 w-5 rounded-full' />
          {user.name}
          </>
        ) : (
          <>
          <i className={`${icon} w-10`} />
        {name}
          </>
        )}
        
      </button>
    </Link>
  );
};

export default Sidebar;
