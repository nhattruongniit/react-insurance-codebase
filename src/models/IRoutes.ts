import React, { ComponentType } from 'react';

export type IRouteItem = {
  path?: string;
  guard?: React.LazyExoticComponent<ComponentType<unknown>> | ComponentType<unknown>;
  layout?: React.FunctionComponent;
  element?: React.LazyExoticComponent<() => JSX.Element> | any;
};

export type IRoutes = IRouteItem & {
  routes?: IRouteItem[];
};
