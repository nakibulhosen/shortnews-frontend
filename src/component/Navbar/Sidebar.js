//react
import React from "react";
// alert
import { warning } from "../../util/Alert";

//react-router-dom
import { NavLink as Link, useHistory } from "react-router-dom";

//MUI
import { makeStyles } from "@material-ui/core";

//admin action
import { UNSET_ADMIN } from "../../Store/Admin/admin.type";

import { useDispatch } from "react-redux";

import $ from "jquery";

const useStyles = makeStyles(() => ({
  navLink: {
    "&.active": {
      color: "#fff !important",
      fontWeight: 500,
      fontSize: 16,
    },
    "&.active i": {
      color: "#fff !important",
      fontWeight: 500,
    },
  },
}));

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  //logout function
  const logout = () => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          dispatch({ type: UNSET_ADMIN });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  //Collapsed DropDown
  const handleCollapsed = () => {
    $("#submenu1").toggleClass("collapse");
  };

  return (
    <>
      <div class="vertical-menu">
        <div data-simplebar class="h-100">
          <div id="sidebar-menu">
            <ul class="metismenu list-unstyled" id="side-menu">
              <li>
                <Link to="/admin/dashboard" className={`${classes.navLink}`}>
                  <i class="bx bx-home-circle"></i>

                  <span key="t-dashboards">Dashboard</span>
                </Link>
              </li>

              <li>
                <Link to="/admin/user" className={`${classes.navLink}`}>
                  <i class="bx bx-user"></i>
                  <span key="t-users">User</span>
                </Link>
              </li>

              <li>
                <Link to="/admin/category" className={`${classes.navLink}`}>
                  <i class="bx bx-cube-alt"></i>

                  <span key="t-Category">Category</span>
                </Link>
              </li>

              <li>
                <Link to="/admin/post" className={`${classes.navLink}`}>
                  <i class="bx bx-file"></i>

                  <span key="t-Post">Post</span>
                </Link>
              </li>

              <li>
                <a
                  class="waves-effect has-arrow"
                  data-target="#submenu1"
                  onClick={handleCollapsed}
                  href={() => false}
                >
                  <i class="fas fa-ad"></i>
                  <span key="t-Advertisement">Advertisement</span>
                </a>
                <ul class="collapse " id="submenu1" aria-expanded="false">
                  <li>
                    <Link
                      to="/admin/googleAd"
                      key="t-googleAd"
                      className={`${classes.navLink}`}
                    >
                      <i class="bx bx-circle" style={{ fontSize: "13px" }}></i>
                      Google Ad
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/admin/customAd"
                      key="t-customAd"
                      className={`${classes.navLink}`}
                    >
                      <i class="bx bx-circle" style={{ fontSize: "13px" }}></i>
                      Custom Ad
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/admin/banner" className={`${classes.navLink}`}>
                  <i class="bx bx-image "></i>
                  <span key="t-profile">Banner</span>
                </Link>
              </li>

              <li>
                <Link to="/admin/setting" className={`${classes.navLink}`}>
                  <i class="bx bx-cog "></i>
                  <span key="t-profile">Setting</span>
                </Link>
              </li>

              <li>
                <Link to="/admin/profile" className={`${classes.navLink}`}>
                  <i class="bx bxs-id-card"></i>
                  <span key="t-profile">Profile</span>
                </Link>
              </li>

              <li
                class="nav-item "
                data-toggle="tooltip"
                title="Log Out"
                data-placement="right"
                onClick={logout}
              >
                <Link class="waves-effect" to={() => false}>
                  <i class="bx bx-power-off"></i>
                  <span>Log Out</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
