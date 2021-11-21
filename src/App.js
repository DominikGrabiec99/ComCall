import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constans/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';

import './App.scss';

import ProtectRoute from './helpers/protected-route';
import IsUserLoggedIn from './helpers/is-user-logged-in';
import { getUserByUserId } from './services/firebase';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Admin = lazy(() => import('./pages/Admin'));
const Panel = lazy(() => import('./pages/Panel'));
const Course = lazy(() => import('./pages/Course'));
const Room = lazy(() => import('./pages/Room'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  const [actualUser, setactualUser] = useState([]);
  const { user } = useAuthListener();

  useEffect(() => {
    async function getUser() {
      setactualUser(await getUserByUserId(user.uid));
    }
    if (user) {
      getUser();
    }

    return () => {
      setactualUser([]);
    };
  }, [user]);

  return (
    <UserContext.Provider value={{ user, actualUser }}>
      <Router>
        <Suspense fallback={<p>loading...</p>}>
          <Switch>
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

            <ProtectRoute user={user} path={ROUTES.ROOM} exact>
              <Room />
            </ProtectRoute>

            <Route exact path="/*" component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
