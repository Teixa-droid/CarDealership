import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';


const useActiveRoute = (rota) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (location.pathname.includes(rota)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location, rota]);

  return isActive;
};

export default useActiveRoute;
