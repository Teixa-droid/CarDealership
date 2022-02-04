import { Link } from 'react-router-dom';
import React, {useState} from 'react';
const SidebarResponsive = () => {
    const [showNavigation, setShowNavigation ] = useState(false);
  return (
      <div 
      className="sm:hidden" 
      onClick={() => { 
        setShowNavigation(!showNavigation);
      }}
      >
        <i className={`mx-2 fas fa-${showNavigation ? 'times' : 'bars'} hover:text-yellow-600`} />
        {showNavigation &&
            <ul className="bg-gray-900">
                <ResponsiveRoute name='Vehicles' rota='/admin/vehicles' />
                <ResponsiveRoute name='Sails' rota='/admin/sails' />
                <ResponsiveRoute name='Users' rota='/admin/users' />
            </ul>
        }
      </div>
  );
};

const ResponsiveRoute = ({ rota, name }) => {
    return (
        <Link to={rota}>
        <li className="text-gray-200 border border-gray-300 p-1">{name}</li>
        </Link>
    );
};

export default SidebarResponsive;
