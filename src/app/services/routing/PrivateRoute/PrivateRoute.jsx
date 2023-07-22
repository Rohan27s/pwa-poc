import React, { useContext } from "react";
import { StateContext } from "../../../page";
import ROUTE_MAP from "../routeMap";
import { Navigate } from "react-router";
import { getCookie } from "../../utils";
import { useSelector } from "react-redux";
const PrivateRoute = ({ children, odk }) => {
  const { state } = useContext(StateContext);
  const isAuthenticated = getCookie("userData");
  const auth1= useSelector((state)=>state.auth);
  console.log("date is::::",auth1);
  console.log("is auth::::",isAuthenticated);


  // if (odk && isAuthenticated) {
  //   if (state && state.userData && state.userData.filledForms && !state.userData.filledForms[odk])
  //     return children;
  //   else
  //     return <Navigate to="/" />
  // }
  return isAuthenticated ? children : <Navigate to={ROUTE_MAP.login} />;
};

export default PrivateRoute;
