//React
import React, { useEffect, useState } from "react";

//Axios
import axios from "axios";

//React-router-dom
import { Link, useHistory } from "react-router-dom";

//Image
import logo from "../../src/assets/images/logo.svg";

//Taost
import { setToast } from "../util/Toast";
import { permissionError } from "../util/Alert";
import { useSelector } from "react-redux";

const ChangePassword = (props) => {
  const history = useHistory();

  const hasPermission = useSelector((state) => state.admin.flag);

  //State Define
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setId] = useState("");
  const [errors, setErrors] = useState("");
  const [error, setError] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  //Use Effect For Getting Id
  useEffect(() => {
    setId(props.match.params.id);
  }, [props.match.params.id]);

  //Handle Submit
  const handleSubmit = () => {
    //Validation
    if (!newPassword || !confirmPassword) {
      const error = {};

      if (!newPassword) error.newPassword = "Require this Filed!";
      if (!confirmPassword) error.confirmPassword = "Require this Filed!";

      return setError({ ...error });
    }

    setErrors("");
    if (confirmPassword !== newPassword) {
      return setErrors("Password & Confirm Password do not match ❌");
    }

    //Store Data
    const content = {
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    //Route Call for setPassword
    axios
      .put(`admin/setPassword?admin_id=${id}`, content)
      .then((res) => {
        if (res.data.status) {
          setToast("success", "Password Changed Successfully ✔");

          setTimeout(() => {
            history.push("/login");
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Handle see new password
  const seeNewPassword = () => {
    var x = document.getElementById("myInputNewPassword");
    if (x.type === "password") {
      x.type = "input";
    } else {
      x.type = "password";
    }
  };

  //Handle see confirm password
  const seeConfirmPassword = () => {
    var x = document.getElementById("myInputConfirmPassword");
    if (x.type === "password") {
      x.type = "input";
    } else {
      x.type = "password";
    }
  };

  return (
    <>
      <div class="account-pages my-5 pt-sm-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6 col-xl-5">
              <div class="card overflow-hidden">
                <div class=" bg-soft" style={{ backgroundColor: "#2a3042" }}>
                  <div class="row" style={{ height: "110px" }}>
                    <div class="col-7">
                      <div class="text-white p-4">
                        <h5 class="text-white">Change password</h5>
                      </div>
                    </div>
                    <div class="col-5 align-self-end">
                      <img
                        src="assets/images/profile-img.png"
                        alt=""
                        class="img-fluid"
                        draggable="false"
                      />
                    </div>
                  </div>
                </div>
                <div class="card-body pt-0">
                  <div class="auth-logo">
                    <a href={() => false} class="auth-logo-light">
                      <div class="avatar-md profile-user-wid mb-4">
                        <span class="avatar-title rounded-circle bg-light">
                          <img
                            src="assets/images/logo-light.svg"
                            alt=""
                            class="rounded-circle"
                            height="34"
                            draggable="false"
                          />
                        </span>
                      </div>
                    </a>

                    <a href={() => false} class="auth-logo-dark">
                      <div class="avatar-md profile-user-wid mb-4">
                        <span class="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            class="rounded-circle"
                            height="34"
                            draggable="false"
                          />
                        </span>
                      </div>
                    </a>
                  </div>
                  <div class="p-2">
                    <form
                      class="form-horizontal"
                      action="https://themesbrand.com/skote/layouts/index.html"
                    >
                      <div class="mb-3">
                        <label for="email">
                          <b>New Password</b>
                        </label>
                        <div class="input-group auth-pass-inputgroup">
                          <input
                            type="password"
                            id="myInputNewPassword"
                            type="password"
                            class="form-control"
                            placeholder="Enter new password"
                            aria-label="Password"
                            aria-describedby="password-addon"
                            onChange={(e) => {
                              setNewPassword(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  newPassword: "Email is required !",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  newPassword: "",
                                });
                              }
                            }}
                          />
                          <button
                            class="btn btn-light "
                            type="button"
                            id="password-addon"
                            onClick={seeNewPassword}
                          >
                            <i class="mdi mdi-eye-outline"></i>
                          </button>
                        </div>
                        {error.newPassword && (
                          <span style={{ color: "red" }}>
                            {error.newPassword}
                          </span>
                        )}
                      </div>

                      <div class="mb-3">
                        <label for="psw">
                          <b>Confirm Password</b>
                        </label>
                        <div class="input-group auth-pass-inputgroup">
                          <input
                            type="password"
                            id="myInputConfirmPassword"
                            class="form-control"
                            placeholder="Enter confirm password"
                            aria-label="Password"
                            aria-describedby="password-addon"
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  confirmPassword: "Password is required !",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  confirmPassword: "",
                                });
                              }
                            }}
                          />
                          <button
                            class="btn btn-light "
                            type="button"
                            id="password-addon"
                            onClick={seeConfirmPassword}
                          >
                            <i class="mdi mdi-eye-outline"></i>
                          </button>
                        </div>
                        {error.confirmPassword && (
                          <span style={{ color: "red" }}>
                            {error.confirmPassword}
                          </span>
                        )}
                        {errors && (
                          <span style={{ color: "red" }}>{errors}</span>
                        )}
                      </div>

                      <div class="mt-4 d-grid ">
                        <button
                          type="button"
                          class="btn waves-effect waves-light text-white"
                          style={{ backgroundColor: "#2a3042" }}
                          onClick={handleSubmit}
                        >
                          Change Password
                        </button>
                      </div>
                      <div class="mt-4 text-center">
                        <Link to="/login" class="text-muted">
                          <i class="mdi mdi-lock me-1"></i> Back To The Login
                          Page ?
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
