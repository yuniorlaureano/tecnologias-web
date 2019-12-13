import { Route, Redirect } from 'react-router-dom';
import React, {useState} from 'react';
const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
    const [loggedIn] = useState(false);
    return (
      <Route
        path={path}
        {...rest}
        render={props => {
          return loggedIn ? (
            <Comp {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/Login",
                state: { prevLocation: path,
                  error: "You need to login first!",},
              }}
            />
          );
        }}
      />
    );
  };

  export default ProtectedRoute;