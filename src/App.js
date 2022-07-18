//react
import React, { lazy, Suspense, useEffect } from "react";

//CSS
import "./assets/css/icons.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/app.min.css";

//react-router-dom
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//Types
import { SET_ADMIN, UNSET_ADMIN } from "./Store/Admin/admin.type";
import { useDispatch } from "react-redux";
import ChangePassword from "./Pages/ChangePassword";

//Ideal Time Manager
import { IdleTimeoutManager } from "idle-timer-manager";

//Imported Pages
const Admin = lazy(() => import("./Pages/Admin"));
const Login = lazy(() => import("./Pages/Login"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const AuthRoute = lazy(() => import("./util/AuthRoute"));
const PrivateRouter = lazy(() => import("./util/PrivateRoute"));

function App() {
  const dispatch = useDispatch();

  //Token and key
  const token = sessionStorage.getItem("token");
  const key = sessionStorage.getItem("key");

  useEffect(() => {
    if (!token && !key) return;

    dispatch({ type: SET_ADMIN, payload: token });
  }, [token, key]);

  useEffect(() => {
    const manager = new IdleTimeoutManager({
      timeout: 1200, //20 min (in sec)
      onExpired: (time) => {
        dispatch({ type: UNSET_ADMIN });
        return <Redirect to="/login" />;
      },
    });

    return () => {
      manager.clear();
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div></div>}>
          <Switch>
            <PrivateRouter path="/admin" component={Admin} />
            <AuthRoute exact path="/" component={Login} />
            <AuthRoute exact path="/login" component={Login} />
            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Route
              exact
              path="/changePassword/:id"
              component={ChangePassword}
            />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
