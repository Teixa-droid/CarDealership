import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';


const useActiveRoute = (route) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (location.pathname.includes(route)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location, route]);

  return isActive;
};

export default useActiveRoute;
