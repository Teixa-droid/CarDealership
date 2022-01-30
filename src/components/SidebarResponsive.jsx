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
        <i className={`fas fa-${showNavigation ? 'times' : 'bars'} hover:text-yellow-600`} />
        {showNavigation &&
            <ul className="bg-gray-900">
                <ResponsiveRoute name='Vehicles' route='/admin/vehicles' />
                <ResponsiveRoute name='Sails' route='/admin/sails' />
                <ResponsiveRoute name='Users' route='/admin/users' />
            </ul>
        }
      </div>
  );
};

const ResponsiveRoute = ({ route, name }) => {
    return (
        <Link to={route}>
        <li className="text-gray-200 border border-gray-300 p-1">{name}</li>
        </Link>
    );
};

export default SidebarResponsive;
