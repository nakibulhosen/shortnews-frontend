//react
import React, { useEffect } from "react";

//Navbar and sidebar
import Navbar from "../component/Navbar/Navbar";
import Sidebar from "../component/Navbar/Sidebar";

//Pages
import Loader from "./LoaderDisplay";

//react-router-dom
import { useRouteMatch, useHistory, Switch, Route } from "react-router-dom";

//Imported Table
import UserTable from "../component/Table/UserTable";
import CategoryTable from "../component/Table/CategoryTable";
import PostTable from "../component/Table/PostTable";
import PostDialog from "../component/Dialog/PostDialog";
import GoogleAd from "../component/Table/GoogleAd";
import OwnAd from "../component/Table/OwnAd";
import OwnAdDialog from "../component/Dialog/OwnAdDialog";
import OwnAdViewDetails from "../component/Dialog/OwnAdViewDetails";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Setting from "./Setting";
import BannerTable from "../component/Table/BannerTable";

const Admin = () => {
  const history = useHistory();
  const location = useRouteMatch();

  useEffect(() => {
    if (history.location.pathname === "/admin") {
      history.push("/admin/dashboard");
    }
  }, []);

  return (
    <>
      <div id="layout-wrapper">
        <Navbar />
        <Sidebar />
        <div class="main-content">
          <div class="page-content">
            <div class="container-fluid">
              <Switch>
                <Route
                  exact
                  path={`${location.path}/dashboard`}
                  component={Dashboard}
                />
                <Route
                  exact
                  path={`${location.path}/user`}
                  component={UserTable}
                />
                <Route
                  exact
                  path={`${location.path}/category`}
                  component={CategoryTable}
                />
                <Route
                  exact
                  path={`${location.path}/post`}
                  component={PostTable}
                />
                <Route
                  exact
                  path={`${location.path}/post/postDialog`}
                  component={PostDialog}
                />
                <Route
                  exact
                  path={`${location.path}/googleAd`}
                  component={GoogleAd}
                />
                <Route
                  exact
                  path={`${location.path}/customAd`}
                  component={OwnAd}
                />
                <Route
                  exact
                  path={`${location.path}/customAd/customAdDialog`}
                  component={OwnAdDialog}
                />
                <Route
                  exact
                  path={`${location.path}/customAd/customAdViewDetails`}
                  component={OwnAdViewDetails}
                />
                <Route
                  exact
                  path={`${location.path}/profile`}
                  component={Profile}
                />
                <Route
                  exact
                  path={`${location.path}/setting`}
                  component={Setting}
                />
                <Route
                  exact
                  path={`${location.path}/banner`}
                  component={BannerTable}
                />
              </Switch>
            </div>
          </div>
          <Loader />
        </div>
      </div>
      <div class="rightbar-overlay"></div>
    </>
  );
};

export default Admin;
