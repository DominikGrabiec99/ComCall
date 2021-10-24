import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constans/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';

import './App.scss';

import ProtectRoute from './helpers/protected-route';
import IsUserLoggedIn from './helpers/is-user-logged-in';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Admin = lazy(() => import('./pages/Admin'));
const Panel = lazy(() => import('./pages/Panel'));
const Course = lazy(() => import('./pages/Course'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>loading...</p>}>
          <Switch>
            {/* <Route exact path={ROUTES.DASHBOARD} component={Dashboard} /> */}

            <IsUserLoggedIn user={user} loggedInPath={ROUTES.PANEL} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </IsUserLoggedIn>

            <IsUserLoggedIn user={user} loggedInPath={ROUTES.PANEL} path={ROUTES.LOGIN}>
              <Login />
            </IsUserLoggedIn>

            <IsUserLoggedIn user={user} loggedInPath={ROUTES.PANEL} path={ROUTES.SIGN_UP}>
              <Signup />
            </IsUserLoggedIn>

            <ProtectRoute user={user} path={ROUTES.PANEL} exact>
              <Panel />
            </ProtectRoute>

            <ProtectRoute user={user} path={ROUTES.ADMIN} exact>
              <Admin />
            </ProtectRoute>

            <ProtectRoute user={user} path={ROUTES.COURSE} exact>
              <Course />
            </ProtectRoute>

            <Route exact path="/*" component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
