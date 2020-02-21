import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./AuthContext";
import { Login } from "./route";
// import io from "socket.io-client";
let socket;
const ProtectedRoute = ({ component: Component, ...rest }) => {
  // useEffect(() => {
  //   socket = io('localhost:5000');
  //   socket.on('connect', () => {
  //     console.log("IN Client user connected")
  //   });
  //   socket.on('Disconnected', () => {
  //     console.log("Disconnected from server")
  //   })
  // }, [])
  return (
    <AuthContext.Consumer>
      {({ isAuth }) => (
        <Route
          {...rest}
          render={(props) =>
            isAuth ? <Component {...props} socket={socket} /> : <Redirect to={Login} />
          }
        />
      )}
    </AuthContext.Consumer>
  );
};

export default ProtectedRoute;
