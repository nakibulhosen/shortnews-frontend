//React
import React, { useEffect, useState } from "react";

//react-router-dom
import { Link, useHistory } from "react-router-dom";

//react-redux
import { connect, useDispatch, useSelector } from "react-redux";

//types
import { UNSET_ADMIN } from "../Store/Admin/admin.type";

//baseUrl
import { baseURL } from "../util/Config";

//Dummy Profile
import dummyProfile from "../assets/images/dummyProfile.png";

//action
import {
  getProfile,
  updateImage,
  updateProfile,
} from "../Store/Admin/admin.action";

//axios
import axios from "axios";

//toast
import { setToast } from "../util/Toast";
import { permissionError } from "../util/Alert";

const Profile = (props) => {
  //define dispatch and history
  const dispatch = useDispatch();
  const history = useHistory();

  //Define States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  //confirm password error
  const [error, setError] = useState("");

  useEffect(() => {
    props.getProfile();
  }, []);

  const { user: admin, flag } = useSelector((state) => state.admin);
  const hasPermission = useSelector((state) => state.admin.flag);

  useEffect(() => {
    setData(admin);
  }, [admin]);

  useEffect(() => {
    setEmail(data.email);
    setName(data.name);
  }, [data]);

  const updateNameAndEmail = () => {
    if (!name || !email) {
      const errors = {};
      //for name validation
      if (!name) errors.name = "Name is Require!";
      //for email validation
      if (!email) errors.email = "Email is Require!";

      return setErrors({ ...errors });
    }
    const content = {
      name: name,
      email: email,
    };
    if (!hasPermission) return permissionError();

    props.updateProfile(content);
  };

  const changePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      const errors = {};

      if (!oldPassword) errors.oldPassword = "Require this Filed!";
      if (!newPassword) errors.newPassword = "Require this Filed!";
      if (!confirmPassword) errors.confirmPassword = "Require this Filed!";

      return setErrors({ ...errors });
    }

    setError("");
    if (confirmPassword !== newPassword) {
      return setError("Password & Confirm Password do not match ❌");
    }

    if (!hasPermission) return permissionError();

    axios
      .put("/admin", {
        oldPass: oldPassword,
        newPass: newPassword,
        confirmPass: confirmPassword,
      })
      .then((res) => {
        if (res.data.status) {
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setToast("success", "Password changed successfully ✔");
          setTimeout(() => {
            dispatch({ type: UNSET_ADMIN });
            history.push("/");
          }, 3000);
        } else {
          setToast("error", "Oops ! Old Password doesn't match");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const imageLoad = (event) => {
    setImage(event.target.files[0]);
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  const handleChangeImage = (e) => {
    const formData = new FormData();
    formData.append("image", image);

    if (!hasPermission) return permissionError();

    props.updateImage(formData);
  };

  return (
    <>
      <div class="row">
        <div class="col-12">
          <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">Profile</h4>

            <div class="page-title-right">
              <ol class="breadcrumb m-0">
                <li class="breadcrumb-item">
                  <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li class="breadcrumb-item active">Profile</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="card mb-4">
            <div class="card-body">
              <center className="mt-2">
                <img
                  src={data.image ? baseURL + data.image : dummyProfile}
                  draggable="false"
                  className="rounded-circle"
                  width="100"
                  alt="img"
                />
                <h4 className="card-title mt-2">{admin.name}</h4>
                <div className="row justify-content-center">
                  <div className="col-4">
                    <a href="javascript:void(0)" className="link">
                      <label for="fileupload">
                        <i
                          className="fas fa-image profile-image"
                          aria-hidden="true"
                          style={{ color: "#2a3042" }}
                        ></i>
                      </label>
                      <input
                        type="file"
                        id="fileupload"
                        hidden
                        onChange={imageLoad}
                      />
                    </a>
                  </div>
                </div>
                <div className="col-sm-12 d-flex pt-2 ">
                  <button
                    className="btn mx-auto text-white "
                    type="button"
                    style={{ backgroundColor: "#2a3042" }}
                    onClick={handleChangeImage}
                  >
                    Update Image
                  </button>
                </div>
              </center>
            </div>
          </div>
        </div>

        <div class="col-xl-8">
          <div class="card">
            <div class="card-body">
              <div class="form-group" id="simple-date1">
                <label
                  class="form-label"
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                  }}
                >
                  Name
                </label>
                <div className="col-md-12">
                  <input
                    class="form-control"
                    type="text"
                    id="example-text-input"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      if (!event.target.value) {
                        return setErrors({
                          ...errors,
                          name: "Name is Required!",
                        });
                      } else {
                        return setErrors({
                          ...errors,
                          name: "",
                        });
                      }
                    }}
                  />
                  {errors.name && (
                    <span style={{ color: "red" }}>{errors.name}</span>
                  )}
                </div>
              </div>

              <div class="form-group">
                <label
                  class="form-label mt-2"
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                  }}
                >
                  Email
                </label>
                <div className="col-md-12">
                  <input
                    class="form-control"
                    type="text"
                    id="example-text-input"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (!event.target.value) {
                        return setErrors({
                          ...errors,
                          email: "Email is Required!",
                        });
                      } else {
                        return setErrors({
                          ...errors,
                          email: "",
                        });
                      }
                    }}
                  />
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="form-group p-3">
                  <div className="col-sm-12 d-flex ">
                    <button
                      className="btn text-white "
                      type="button"
                      style={{ backgroundColor: "#2a3042" }}
                      onClick={updateNameAndEmail}
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div class="card">
          <div class="card-body">
            <div class="form-group">
              <label
                class="form-label mt-2"
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Old Password
              </label>
              <div className="col-md-12">
                <input
                  class="form-control"
                  type="password"
                  id="example-text-input"
                  onChange={(event) => {
                    setOldPassword(event.target.value);
                    if (!event.target.value) {
                      return setErrors({
                        ...errors,
                        oldPassword: "Require this Filed!",
                      });
                    } else {
                      return setErrors({
                        ...errors,
                        oldPassword: "",
                      });
                    }
                  }}
                />
                {errors.oldPassword && (
                  <span style={{ color: "red" }}>{errors.oldPassword}</span>
                )}
              </div>
            </div>
            <div className="form-group mt-2">
              <label
                for="example-email"
                className="col-md-12"
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                New Password
              </label>
              <div className="col-md-12">
                <input
                  class="form-control"
                  type="password"
                  id="example-text-input"
                  onChange={(event) => {
                    setNewPassword(event.target.value);
                    if (!event.target.value) {
                      return setErrors({
                        ...errors,
                        newPassword: "Require this Filed!",
                      });
                    } else {
                      return setErrors({
                        ...errors,
                        newPassword: "",
                      });
                    }
                  }}
                />
                {errors.newPassword && (
                  <span style={{ color: "red" }}>{errors.newPassword}</span>
                )}
              </div>
            </div>

            <div className="form-group mt-2">
              <label
                for="example-email"
                className="col-md-12"
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Confirm Password
              </label>
              <div className="col-md-12">
                <input
                  class="form-control"
                  type="password"
                  id="example-text-input"
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    if (!event.target.value) {
                      return setErrors({
                        ...errors,
                        confirmPassword: "Require this Filed!",
                      });
                    } else {
                      return setErrors({
                        ...errors,
                        confirmPassword: "",
                      });
                    }
                  }}
                />
                {errors.confirmPassword && (
                  <span style={{ color: "red" }}>{errors.confirmPassword}</span>
                )}
                {error && <span style={{ color: "red" }}>{error}</span>}
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="form-group p-3 ">
                <div className="col-sm-12 d-flex ">
                  <button
                    className="btn mx-auto mx-md-0 text-white  "
                    style={{ backgroundColor: "#2a3042" }}
                    type="button"
                    onClick={changePassword}
                  >
                    Set Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  getProfile,
  updateImage,
  updateProfile,
})(Profile);
