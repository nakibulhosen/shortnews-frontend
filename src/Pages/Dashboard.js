//React
import React, { useEffect } from "react";

//redux
import { useSelector, connect } from "react-redux";

//react-router-dom
import { NavLink } from "react-router-dom";

//action
import { getDashboard } from "../Store/dashboard/action";

const Dashboard = (props) => {
  //Get Data
  useEffect(() => {
    props.getDashboard();
  }, []);

  const { dashboard } = useSelector((state) => state.dashboard);

  //Total Of All
  const total =
    dashboard?.totalUser +
    dashboard?.totalCategory +
    dashboard?.totalOwnAd +
    dashboard?.totalPost +
    dashboard?.totalImpression +
    dashboard?.totalClick;

  //Percentage Of Every Table
  const userPer = ((dashboard?.totalUser * 100) / total).toFixed(2);
  const categoryPer = ((dashboard?.totalCategory * 100) / total).toFixed(2);
  const ownAdPer = ((dashboard?.totalOwnAd * 100) / total).toFixed(2);
  const postPer = ((dashboard?.totalPost * 100) / total).toFixed(2);
  const impressionPer = ((dashboard?.totalImpression * 100) / total).toFixed(2);
  const clickPer = ((dashboard?.totalClick * 100) / total).toFixed(2);

  //Width Set For Progress bar
  const postWidth = postPer + "%";
  const categoryWidth = categoryPer + "%";
  const ownAdWidth = ownAdPer + "%";
  const userWidth = userPer + "%";
  const impressionWidth = impressionPer + "%";
  const clickWidth = clickPer + "%";

  return (
    <>
      <div class="page-title-box d-sm-flex align-items-center justify-content-between">
        <h4 class="mb-sm-0 font-size-18">Dashboard</h4>

        <div class="page-title-right">
          <ol class="breadcrumb m-0">
            <li class="breadcrumb-item active">Dashboard</li>
          </ol>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-4">
          <NavLink to="/admin/user">
            <div class="card overflow-hidden">
              <div class="bg-primary bg-soft">
                <div class="row">
                  <div class="text-end p-3 ">
                    <h5 class="text-primary" style={{ marginRight: "10px" }}>
                      User
                    </h5>
                  </div>
                </div>
              </div>
              <div class="card-body pt-0">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="avatar-md profile-user-wid ">
                      <div class="flex-shrink-0 align-self-center ">
                        <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                          <span class="avatar-title rounded-circle bg-primary">
                            <i class="bx bx-user font-size-24 "></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row col-sm-12">
                  <div class="row">
                    <div class="col-12">
                      <h3>{dashboard?.totalUser}</h3>
                      <h6 class="text-muted mb-0">Total User</h6>
                    </div>
                  </div>
                </div>

                <div class="">
                  <div class="text-end">
                    <h6 class=" mb-0 text-primary">{userWidth}</h6>
                  </div>

                  <div class="progress progress-md mt-2">
                    <div
                      class="progress-bar progress-bar-striped"
                      role="progressbar"
                      style={{ width: userWidth }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        </div>

        <div class="col-xl-4">
          <NavLink to="/admin/category">
            <div class="card overflow-hidden">
              <div class="bg-success bg-soft">
                <div class="row">
                  <div class="text-end p-3">
                    <h5 class="text-success" style={{ marginRight: "10px" }}>
                      Category
                    </h5>
                  </div>
                </div>
              </div>
              <div class="card-body pt-0">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="avatar-md profile-user-wid ">
                      <div class="flex-shrink-0 align-self-center ">
                        <div class="avatar-sm rounded-circle bg-success mini-stat-icon">
                          <span class="avatar-title rounded-circle bg-success">
                            <i class="fas fa-cubes font-size-24 "></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row col-sm-12">
                  <div class="row">
                    <div class="col-12">
                      <h3>{dashboard?.totalCategory}</h3>
                      <h6 class="text-muted mb-0">Total Category</h6>
                    </div>
                  </div>
                </div>

                <div class="">
                  <div class="text-end">
                    <h6 class=" mb-0 text-success">{categoryWidth}</h6>
                  </div>

                  <div class="progress progress-bar-striped progress-md mt-2">
                    <div
                      class="progress-bar progress-bar-striped bg-success"
                      role="progressbar"
                      style={{ width: categoryWidth }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        </div>

        <div class="col-xl-4">
          <NavLink to="/admin/post">
            <div class="card overflow-hidden">
              <div class="bg-danger bg-soft">
                <div class="row">
                  <div class="text-end p-3">
                    <h5 class="text-danger" style={{ marginRight: "10px" }}>
                      Post
                    </h5>
                  </div>
                </div>
              </div>
              <div class="card-body pt-0">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="avatar-md profile-user-wid ">
                      <div class="flex-shrink-0 align-self-center ">
                        <div class="avatar-sm rounded-circle bg-danger mini-stat-icon">
                          <span class="avatar-title rounded-circle bg-danger">
                            <i class="bx bx-file font-size-24 "></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row col-sm-12">
                  <div class="row">
                    <div class="col-12">
                      <h3>{dashboard?.totalPost}</h3>
                      <h6 class="text-muted mb-0">Total Post</h6>
                    </div>
                  </div>
                </div>

                <div class="">
                  <div class="text-end">
                    <h6 class=" mb-0 text-danger">{postWidth}</h6>
                  </div>

                  <div class="progress progress-md mt-2">
                    <div
                      class="progress-bar progress-bar-striped bg-danger"
                      role="progressbar"
                      style={{ width: postWidth }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-4">
          <NavLink to="/admin/customAd">
            <div class="card overflow-hidden">
              <div class="bg-warning bg-soft">
                <div class="row">
                  <div class="text-end p-3">
                    <h5 class="text-warning" style={{ marginRight: "10px" }}>
                      CustomAd
                    </h5>
                  </div>
                </div>
              </div>
              <div class="card-body pt-0">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="avatar-md profile-user-wid ">
                      <div class="flex-shrink-0 align-self-center ">
                        <div class="avatar-sm rounded-circle bg-warning mini-stat-icon">
                          <span class="avatar-title rounded-circle bg-warning">
                            <i class="fas fa-ad font-size-24 "></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row col-sm-12">
                  <div class="row">
                    <div class="col-12">
                      <h3>{dashboard?.totalOwnAd}</h3>
                      <h6 class="text-muted mb-0">Total CustomAd</h6>
                    </div>
                  </div>
                </div>

                <div class="">
                  <div class="text-end">
                    <h6 class=" mb-0 text-warning">{ownAdWidth}</h6>
                  </div>

                  <div class="progress progress-md mt-2">
                    <div
                      class="progress-bar progress-bar-striped bg-warning"
                      role="progressbar"
                      style={{ width: ownAdWidth }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        </div>

        <div class="col-xl-4">
          <NavLink to="/admin/customAd">
            <div class="card overflow-hidden">
              <div class="bg-dark bg-soft">
                <div class="row">
                  <div class="text-end p-3">
                    <h5 class="text-dark" style={{ marginRight: "10px" }}>
                      Impression
                    </h5>
                  </div>
                </div>
              </div>
              <div class="card-body pt-0">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="avatar-md profile-user-wid ">
                      <div class="flex-shrink-0 align-self-center ">
                        <div class="avatar-sm rounded-circle bg-dark mini-stat-icon">
                          <span class="avatar-title rounded-circle bg-dark">
                            <i class="fas fa-eye font-size-24 "></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row col-sm-12">
                  <div class="row">
                    <div class="col-12">
                      <h3>{dashboard?.totalImpression}</h3>
                      <h6 class="text-muted mb-0">Total Impression</h6>
                    </div>
                  </div>
                </div>

                <div class="">
                  <div class="text-end">
                    <h6 class=" mb-0 text-dark">{impressionWidth}</h6>
                  </div>

                  <div class="progress progress-md mt-2">
                    <div
                      class="progress-bar progress-bar-striped bg-dark"
                      role="progressbar"
                      style={{ width: impressionWidth }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        </div>

        <div class="col-xl-4">
          <NavLink to="/admin/customAd">
            <div class="card overflow-hidden">
              <div class="bg-info bg-soft">
                <div class="row">
                  <div class="text-end p-3">
                    <h5 class="text-info" style={{ marginRight: "10px" }}>
                      Click
                    </h5>
                  </div>
                </div>
              </div>
              <div class="card-body pt-0">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="avatar-md profile-user-wid ">
                      <div class="flex-shrink-0 align-self-center ">
                        <div class="avatar-sm rounded-circle bg-info mini-stat-icon">
                          <span class="avatar-title rounded-circle bg-info">
                            <i class="fas fa-hand-pointer font-size-24 "></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row col-sm-12">
                  <div class="row">
                    <div class="col-12">
                      <h3>{dashboard?.totalClick}</h3>
                      <h6 class="text-muted mb-0">Total Click</h6>
                    </div>
                  </div>
                </div>

                <div class="">
                  <div class="text-end">
                    <h6 class=" mb-0 text-info">{clickWidth}</h6>
                  </div>

                  <div class="progress progress-md mt-2">
                    <div
                      class="progress-bar progress-bar-striped bg-info"
                      role="progressbar"
                      style={{ width: clickWidth }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  getDashboard,
})(Dashboard);
