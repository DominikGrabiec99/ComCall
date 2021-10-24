import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constans/routes';

const ProtectRoute = ({ user, children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) => {
      if (user) {
        return children;
      }

      if (!user) {
        return (
          <Redirect
            to={{
              pathname: ROUTES.LOGIN,
              state: { from: location }
            }}
          />
        );
      }
      return null;
    }}
  />
);

export default ProtectRoute;

ProtectRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired
};
