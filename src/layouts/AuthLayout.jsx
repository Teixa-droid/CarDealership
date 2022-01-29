import React from 'react';

const AuthLayout = ({ children } ) => {
  return (
    <div className="flex flex-col item-center justify-center bg-gray-50 py-2 px-4">
      Pagina AuthLayout
      <div w-full>{children}</div>
    </div>
  );
};

export default AuthLayout;
