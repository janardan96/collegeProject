import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./AuthContext";
import { Login } from "./route";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <AuthContext.Consumer>
      {({ isAuth }) => (
        <Route
          {...rest}
          render={(props) =>
            isAuth ? <Component {...props} /> : <Redirect to={Login} />
          }
        />
      )}
    </AuthContext.Consumer>
  );
};

export default ProtectedRoute;
