import React, { ComponentType } from 'react';

type IRouteItem = {
  exact?: boolean;
  path?: string;
  guard?: React.LazyExoticComponent<ComponentType<unknown>> | ComponentType<unknown>;
  layout?: React.FunctionComponent;
  component?: any;
  requireRoles?: string[] | [];
};

export type IRoutes = IRouteItem & {
  routes?: IRouteItem[];
};
