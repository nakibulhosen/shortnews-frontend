//react
import React, { useEffect, useState } from "react";

//react-redux
import { useSelector, connect } from "react-redux";

import $ from "jquery";

//react-router-dom
import { Link, useHistory } from "react-router-dom";

//admin action
import { UNSET_ADMIN } from "../../Store/Admin/admin.type";

import { useDispatch } from "react-redux";

//action
import { getProfile } from "../../Store/Admin/admin.action";

//Dummy Profile
import dummyProfile from "../../assets/images/dummyProfile.png";

//MUI
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
  DialogActions,
} from "@material-ui/core";

import { permissionError, warning } from "../../util/Alert";

import Cancel from "@material-ui/icons/Cancel";
import { setToast } from "../../util/Toast";

//image

import logo from "../../assets/images/Logo.png";

//axios
import axios from "axios";
import { baseURL } from "../../util/Config";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const hasPermission = useSelector((state) => state.admin.flag);

  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setError] = useState({
    title: "",
    image: "",
    description: "",
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setError({
      title: "",
      image: "",
      description: "",
      type: "",
    });
    setTitle("");
    setDescription("");
    setImageData(null);
    setImagePath(null);
    $("#file").val("");
  };

  const handleInputImage = (e) => {
    if (e.target.files[0]) {
      setImageData(e.target.files[0]);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !imageData || !imagePath) {
      const errors = {};

      if (!title) {
        errors.title = "Title can't be a blank!";
      }
      if (!description) {
        errors.description = "Description can't be a blank!";
      }

      if (!imageData || !imagePath) {
        errors.image = "Please select an Image!";
      }

      return setError({ ...errors });
    }

    setError({ ...errors, image: "" });
    const formData = new FormData();
    formData.append("image", imageData);
    formData.append("title", title);
    formData.append("description", description);

    if (!hasPermission) return permissionError();

    axios
      .post("/notification", formData)
      .then((res) => {
        if (res.data.data === true) {
          setToast("success", "Notification sent successfully!");
          setOpen(false);

          setError({
            title: "",
            image: "",
            description: "",
          });
          setTitle("");
          setDescription("");
          setImageData(null);
          setImagePath(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //get admin
  const [data, setData] = useState([]);

  useEffect(() => {
    props.getProfile();
  }, []);

  const { user: admin } = useSelector((state) => state.admin);

  useEffect(() => {
    setData(admin);
  }, [admin]);

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

  //sidebar toggle function
  const handleCollapse = () => {
    $("body").toggleClass("sidebar-enable vertical-collpsed");
  };

  //Collapse dropdown menu
  $(document).ready(() => {
    $(".dropdown-item").click(() => {
      $(".dropdown-menu").removeClass("show");
    });
  });

  $(document).ready(() => {
    $(".page-content").click(() => {
      $(".dropdown-menu").removeClass("show");
    });
  });

  //show and hide dropdown menu
  const handleOpenCollapse = () => {
    $(".dropdown-menu").toggleClass("show");
  };

  return (
    <>
      <header id="page-topbar">
        <div class="navbar-header">
          <div class="d-flex">
            <div class="navbar-brand-box">
              <Link to="/admin/dashboard" class="logo logo-light">
                <span class="logo-sm">
                  <img src={logo} alt="" height="22" draggable="false" />
                </span>
                <span
                  class="logo-lg"
                  style={{ fontSize: "18px", color: "#fff" }}
                >
                  YOUR APP NAME
                </span>
              </Link>
            </div>

            <button
              type="button"
              class="btn btn-sm px-3 font-size-16 header-item waves-effect"
              id="vertical-menu-btn"
              onClick={handleCollapse}
            >
              <i class="fa fa-fw fa-bars"></i>
            </button>
          </div>

          <div class="d-flex">
            <div class="dropdown d-inline-block">
              <button
                type="button"
                class="btn header-item noti-icon waves-effect"
                id="page-header-notifications-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={handleClickOpen}
              >
                <i class="bx bx-bell bx-tada"></i>
              </button>
            </div>

            <div class="dropdown d-inline-block">
              <button
                type="button"
                class="btn header-item waves-effect"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={handleOpenCollapse}
              >
                <img
                  class="rounded-circle header-profile-user"
                  src={data?.image ? baseURL + data?.image : dummyProfile}
                  alt="adminImage"
                  draggable="false"
                />
                <span class="d-none d-xl-inline-block ms-1" key="t-henry">
                  {admin.name}
                </span>
                <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
              </button>
              <div class="dropdown-menu dropdown-menu-end">
                <Link class="dropdown-item" to="/admin/profile">
                  <i class="bx bx-user font-size-16 align-middle me-1"></i>
                  <span key="t-profile">Profile</span>
                </Link>

                <div class="dropdown-divider"></div>
                <a
                  class="dropdown-item text-danger"
                  href={() => false}
                  onClick={logout}
                >
                  <i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>
                  <span key="t-logout">Logout</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ------------ Notification Dialog ------------------ */}
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={handleClose}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="responsive-dialog-title">{"Notification"}</DialogTitle>

        <IconButton
          style={{
            position: "absolute",
            right: 0,
            color: "#2a3042",
          }}
        >
          <Tooltip title="Close">
            <Cancel onClick={handleClose} />
          </Tooltip>
        </IconButton>
        <DialogContent>
          <div class="d-flex flex-column ">
            <form>
              <div class="form-group">
                <label class="form-label ">Title</label>

                <input
                  type="text"
                  class="form-control"
                  placeholder="Title"
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);

                    if (!e.target.value) {
                      return setError({
                        ...errors,
                        title: "Title can't be a blank!",
                      });
                    } else {
                      return setError({
                        ...errors,
                        title: "",
                      });
                    }
                  }}
                />
                {errors.title && (
                  <div class="pl-1 text-left">
                    <Typography variant="caption" color="error">
                      {errors.title}
                    </Typography>
                  </div>
                )}
              </div>
              <div class="form-group ">
                <label class="float-left mt-2">Description</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Description"
                  required
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);

                    if (!e.target.value) {
                      return setError({
                        ...errors,
                        description: "Description can't be a blank!",
                      });
                    } else {
                      return setError({
                        ...errors,
                        description: "",
                      });
                    }
                  }}
                />
                {errors.description && (
                  <div class="pl-1 text-left">
                    <Typography variant="caption" color="error">
                      {errors.description}
                    </Typography>
                  </div>
                )}
              </div>

              <div class="form-group ">
                <label class="float-left mt-2">Image</label>
                <input
                  type="file"
                  class="form-control"
                  accept="image/*"
                  required=""
                  onChange={handleInputImage}
                />
                {errors.image && (
                  <div class="pl-1 text-left">
                    <Typography variant="caption" color="error">
                      {errors.image}
                    </Typography>
                  </div>
                )}

                {imagePath && (
                  <>
                    <img
                      height="100px"
                      width="100px"
                      alt="app"
                      src={imagePath}
                      draggable="false"
                      style={{
                        boxShadow: "0 5px 15px 0 rgb(105 103 103 / 50%)",
                        border: "2px solid #fff",
                        borderRadius: 10,
                        marginTop: 10,
                        float: "left",
                      }}
                      className="mb-3"
                    />
                  </>
                )}
              </div>
            </form>
            <DialogActions>
              <button
                type="button"
                class="btn   mt-2  px-2 text-white"
                style={{ backgroundColor: "#2a3042" }}
                onClick={handleSubmit}
              >
                <i class="fas fa-paper-plane mr-2"></i> Send
              </button>
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default connect(null, { getProfile })(Navbar);
