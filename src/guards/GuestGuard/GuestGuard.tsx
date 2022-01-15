import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

// configs
import { PATH_NAME } from 'configs';

const GuestGuard: FC = ({ children }) => {
  const isAuth = true;

  if (isAuth) return <Navigate to={PATH_NAME.ROOT} />;

  return <>{children}</>;
};

export default GuestGuard;
