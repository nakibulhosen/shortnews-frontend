//React
import React, { useState } from "react";

//Router Dom
import { Link } from "react-router-dom";

//Axios
import axios from "axios";

//action
import { getProfile } from "../Store/Admin/admin.action";

//react-redux
import { connect, useSelector } from "react-redux";

//logo
import logo from "../../src/assets/images/logo.svg";

//toast
import { setToast } from "../util/Toast";
import { permissionError } from "../util/Alert";

const ForgotPassword = () => {
  //Define States
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    email: "",
  });

  const hasPermission = useSelector((state) => state.admin.flag);

  //Handle Submit
  const handleSubmit = () => {
    //Validation
    if (!email) {
      const error = {};
      if (!email) error.email = "Email is required !";

      return setError({ ...error });
    }

    const content = {
      email: email,
    };

    //Call Route
    axios
      .put(`admin/forgotPassword`, content)
      .then((res) => {
        if (!res.data.status) {
          setToast("error", res.data.message);
        } else {
          setToast("success", res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
                        <h5 class="text-white"> Forgot Password</h5>
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
                  <div>
                    <a>
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
                    <div
                      class="alert alert-success text-center mb-4"
                      role="alert"
                    >
                      Enter your Email and instructions will be sent to you!
                    </div>
                    <form
                      class="form-horizontal"
                      action="https://themesbrand.com/skote/layouts/index.html"
                    >
                      <div class="mb-3">
                        <label for="useremail" class="form-label">
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

                      <div class="text-end">
                        <button
                          class="btn  waves-effect waves-light text-white"
                          style={{ backgroundColor: "#2a3042" }}
                          type="button"
                          onClick={handleSubmit}
                        >
                          send
                        </button>
                      </div>
                      <div class="mt-4 text-center">
                        <Link to="/login" class="text-muted">
                          <i class="mdi mdi-lock me-1"></i> Back to login page?
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

export default connect(null, { getProfile })(ForgotPassword);
