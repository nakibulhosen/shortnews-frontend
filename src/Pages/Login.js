//react
import React, { useState } from "react";

//action
import { login } from "../Store/Admin/admin.action";

//redux
import { connect } from "react-redux";

//react-router-dom
import { Link } from "react-router-dom";

//image
import logo from "../../src/assets/images/logo.svg";

const Login = (props) => {
  //State Define
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  //Submit Functionality
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      const error = {};

      if (!email) {
        error.email = "Email is required !";
      }

      if (!password) {
        error.password = "Password is required !";
      }

      return setError({ ...error });
    }

    const details = {
      email: email,
      password: password,
    };
    props.login(details);
  };

  //Handle see password
  const seePassword = () => {
    var x = document.getElementById("myInput");
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
                  <div class="row" style={{ height: "140px" }}>
                    <div class="col-7">
                      <div class="text-white p-4">
                        <h5 class="text-white">Welcome !</h5>
                        <p>Sign in to continue.</p>
                      </div>
                    </div>
                    <div class="col-5 align-self-end">
                      <img
                        src="assets/images/profile-img.png"
                        alt=""
                        class="img-fluid"
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
                      <div class="avatar-md profile-user-wid mb-3">
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
                        <label for="username" class="form-label">
                          Email
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="username"
                          placeholder="Enter username"
                          onChange={(e) => {
                            setEmail(e.target.value);

                            if (!e.target.value) {
                              return setError({
                                ...error,
                                email: "Email is required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                email: "",
                              });
                            }
                          }}
                        />
                        {error.email && (
                          <span style={{ color: "red" }}>{error.email}</span>
                        )}
                      </div>

                      <div class="mb-3">
                        <label class="form-label">Password</label>
                        <div class="input-group auth-pass-inputgroup">
                          <input
                            type="password"
                            id="myInput"
                            class="form-control"
                            placeholder="Enter password"
                            aria-label="Password"
                            aria-describedby="password-addon"
                            onChange={(e) => {
                              setPassword(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  password: "Password is required !",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  password: "",
                                });
                              }
                            }}
                          />
                          <button
                            class="btn btn-light "
                            type="button"
                            id="password-addon"
                            onClick={seePassword}
                          >
                            <i class="mdi mdi-eye-outline"></i>
                          </button>
                        </div>
                        {error.password && (
                          <span style={{ color: "red" }}>{error.password}</span>
                        )}
                      </div>

                      <div class="mt-4 d-grid">
                        <button
                          type="button"
                          class="btn  waves-effect waves-light text-white"
                          style={{ backgroundColor: "#2a3042" }}
                          onClick={handleSubmit}
                        >
                          Log In
                        </button>
                      </div>

                      <div class="mt-4 text-center">
                        <Link to="/forgotPassword" class="text-muted">
                          <i class="mdi mdi-lock me-1"></i> Forgot your
                          password?
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

export default connect(null, { login })(Login);
