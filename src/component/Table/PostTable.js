//react
import React, { useEffect, useState } from "react";

//react-redux
import { connect, useDispatch, useSelector } from "react-redux";

//action
import {
  deletePost,
  getToggleAPI,
  changeToggleAPI,
  getPostPagination,
} from "../../Store/Post/post.action";

// alert
import { permissionError, warningForText } from "../../util/Alert";

//dayjs
import dayjs from "dayjs";

//react-router-dom
import { Link, useHistory } from "react-router-dom";

//type
import { OPEN_DIALOG } from "../../Store/Category/type";

//MUI
import IOSSwitch from "@material-ui/core/Switch";

//axios
import axios from "axios";
import { setToast } from "../../util/Toast";
import ServerPagination from "../../Pages/ServerPagination";

const PostTable = (props) => {
  //Define History
  const history = useHistory();

  //define states
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("ALL");

  const dispatch = useDispatch();
  const { post, postToggleAPI, total } = useSelector((state) => state.post);
  const hasPermission = useSelector((state) => state.admin.flag);

  //useEffect for Get Data
  useEffect(() => {
    if (searchTerm === "" || searchTerm) {
      props.getPostPagination(page, size, searchTerm);
    }
  }, [page, size, searchTerm]);

  useEffect(() => {
    props.getToggleAPI();
  }, []);

  //Set Data after Getting
  useEffect(() => {
    setData(post);
  }, [post]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleRowsPerPage = (value) => {
    setPage(1);
    setSize(value);
  };

  // insert button
  const insertOpen = () => {
    localStorage.removeItem("updatePostData");
    history.push("/admin/post/postDialog");
  };

  //update button
  const updateOpen = (value) => {
    dispatch({ type: OPEN_DIALOG, payload: value });
    localStorage.setItem("updatePostData", JSON.stringify(value));

    history.push("/admin/post/postDialog");
  };

  //Delete Function
  const openDeleteDialog = (value) => {
    const text = `Total ${
      value?.bookMark?.length == undefined ? 0 : value?.bookMark?.length
    } bookmarks will be deleted !`;

    const data = warningForText(text);
    data
      .then((isDeleted) => {
        if (isDeleted) {
          if (!hasPermission) return permissionError();

          props.deletePost(value._id);
        }
      })
      .catch((err) => console.log(err));
  };

  //ToggleAPI Switch
  const handleToggleAPI = () => {
    props.changeToggleAPI();
  };

  let data_ = [];

  post.map((post_) => {
    if (post_.type === 2) {
      data_ = post_.imageVideo.split("v=");
    }
  });

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  //send post notification
  const sendNotification = (value) => {
    if (!hasPermission) return permissionError();

    axios
      .post("/notification", { postId: value })
      .then((res) => {
        if (res.data.data) {
          setToast("success", "Notification sent successfully!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div class="row">
        <div class="col-12">
          <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">Post Table</h4>

            <div class="page-title-right">
              <ol class="breadcrumb m-0">
                <li class="breadcrumb-item">
                  <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li class="breadcrumb-item active">Post Table</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <div className="row my-3">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8 float-left">
                  <button
                    type="button"
                    className="btn  text-white  px-2"
                    style={{ backgroundColor: "#2a3042" }}
                    onClick={insertOpen}
                  >
                    <i class="fas fa-plus fa-md"></i>&nbsp; New
                  </button>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 float-right mt-3 mt-lg-0 mt-xl-0">
                  <form action="">
                    <div className="input-group  border rounded-pill">
                      <input
                        type="search"
                        id="searchBar"
                        autoComplete="off"
                        placeholder="Searching for..."
                        className="form-control bg-none border-0 rounded-pill searchBar"
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                        }}
                      />
                    </div>
                  </form>
                </div>
              </div>

              <div class=" py-3 d-flex flex-row align-items-center justify-content-between">
                <div>
                  <strong>Get posts from other API :</strong>
                  <IOSSwitch
                    checked={postToggleAPI}
                    color="primary"
                    onClick={handleToggleAPI}
                  />
                </div>
              </div>
              <div class="table-responsive">
                <table class="table mb-0">
                  <thead class="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Image/Video</th>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Location</th>
                      <th>Category Name</th>
                      <th>Created At</th>
                      <th>Notification</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody className="align-middle">
                    {data?.length > 0 ? (
                      data.map((value, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              {value.type === 0 && (
                                <img
                                  className="shadow p-1 mb-2 bg-white rounded object-fit"
                                  src={value?.imageVideo}
                                  draggable="false"
                                  height="100px"
                                  width="100px"
                                  alt="postImage"
                                />
                              )}
                              {value.type === 1 && (
                                <div class="container-image ">
                                  <video
                                    className="object-fit"
                                    src={value?.imageVideo}
                                    width="100PX"
                                    height="100PX"
                                  />
                                  <button
                                    class="btn-image"
                                    onClick={() =>
                                      openInNewTab(value?.imageVideo)
                                    }
                                  >
                                    <i class="fas fa-play fa-md"></i>
                                  </button>
                                </div>
                              )}
                              {value.type === 2 && (
                                <div class="container-image">
                                  <img
                                    className="object-fit"
                                    width="100"
                                    height="100"
                                    src={`https://img.youtube.com/vi/${data_[1]}/mqdefault.jpg`}
                                    alt=""
                                  />

                                  <button
                                    class="btn-image"
                                    onClick={() =>
                                      openInNewTab(value?.imageVideo)
                                    }
                                  >
                                    <i class="fas fa-play fa-md"></i>
                                  </button>
                                </div>
                              )}
                            </td>
                            <td>
                              {value?.title?.length > 10
                                ? value?.title.slice(0, 10) + "..."
                                : value?.title}
                            </td>
                            <td className="text-center">{value?.type}</td>
                            <td className="text-center">
                              {value?.location === "unknown"
                                ? "-"
                                : value?.location}
                            </td>
                            <td>{value?.categoryName}</td>

                            <td>
                              {dayjs(value?.createdAt).format("DD MMM YYYY")}
                            </td>

                            <td className="text-center">
                              <button
                                type="button"
                                className="btn btn-warning  btn-rounded text-white"
                                onClick={() => sendNotification(value._id)}
                              >
                                <i class="fas fa-bell  fa-md"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-primary btn-rounded text-white"
                                onClick={() => updateOpen(value)}
                              >
                                <i class="fas fa-pencil-alt fa-xs"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger btn-rounded text-white"
                                onClick={() => openDeleteDialog(value)}
                              >
                                <i class="far fa-trash-alt fa-sm"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="10" className="text-center">
                          No data found !
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <ServerPagination
                activePage={page}
                rowsPerPage={size}
                userTotal={total}
                handleRowsPerPage={handleRowsPerPage}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  deletePost,
  getToggleAPI,
  changeToggleAPI,
  getPostPagination,
})(PostTable);
