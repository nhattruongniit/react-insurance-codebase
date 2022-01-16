import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// configs
import { PATH_NAME } from 'configs';

// guards
import AuthGuard from 'guards/AuthGuard';

// layout
import MainLayout from 'layout/MainLayout';
import GuestGuard from 'guards/GuestGuard';

// types
import { IRoutes, IRouteItem } from 'models/IRoutes';

// features
const Employer = React.lazy(() => import('features/employer'));
const UserManagement = React.lazy(() => import('features/user-management'));
const Employees = React.lazy(() => import('features/employees'));
const Login = React.lazy(() => import('features/login'));
const NotFound = React.lazy(() => import('features/not-found'));
const Counter = React.lazy(() => import('features/counter/Counter'));

const routesConfig: IRoutes[] = [
  {
    path: PATH_NAME.ROOT,
    element: () => <Navigate to={PATH_NAME.EMPLOYER} />,
  },
  {
    path: PATH_NAME.LOGIN,
    guard: GuestGuard,
    element: Login,
  },
  {
    path: '*',
    element: NotFound,
  },
  {
    path: PATH_NAME.EMPLOYER,
    element: Employer,
    guard: AuthGuard,
    layout: MainLayout,
  },
  {
    path: PATH_NAME.EMPLOYEES,
    element: Employees,
    guard: AuthGuard,
    layout: MainLayout,
  },
  {
    path: PATH_NAME.USER_MANAGEMENT,
    element: UserManagement,
    guard: AuthGuard,
    layout: MainLayout,
  },
  {
    path: '/playbackground',
    element: Counter,
    guard: AuthGuard,
    layout: MainLayout,
  },
];

const renderRoutes = (routes: IRoutes[]) => {
  return (
    <Router>
      <React.Suspense fallback={<div />}>
        <Routes>
          {routes.map((route: IRouteItem, routeIdx: number) => {
            const Guard = route.guard || React.Fragment;
            const Layout = route.layout || React.Fragment;
            const Component = route.element;

            return (
              <Route
                key={`route-${routeIdx}`}
                path={route.path}
                element={
                  <Guard>
                    <Layout>
                      <Component />
                    </Layout>
                  </Guard>
                }
              />
            );
          })}
        </Routes>
      </React.Suspense>
    </Router>
  );
};

function RoutesMain() {
  return renderRoutes(routesConfig);
}

export default RoutesMain;
