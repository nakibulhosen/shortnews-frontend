//React
import React, { useEffect, useRef, useState } from "react";

//MUI
import { DialogActions, Typography } from "@material-ui/core";

//Actions
import { getCategory } from "../../Store/Category/action";
import { insertPost, updatePost } from "../../Store/Post/post.action";

//router-dom
import { Link } from "react-router-dom";

//editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

//react-redux
import { connect, useSelector } from "react-redux";

//react-router-dom
import { useHistory } from "react-router-dom";
import { permissionError } from "../../util/Alert";

const PostDialog = (props) => {
  //Get data from LocalStorage
  const dialogData = JSON.parse(localStorage.getItem("updatePostData"));

  //useSelector
  const { category } = useSelector((state) => state.category);
  const hasPermission = useSelector((state) => state.admin.flag);

  const editor = useRef(null);

  const history = useHistory();

  //define state
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState(null);
  const [type, setType] = useState(0);
  const [getMore, setGetMore] = useState(null);
  const [location, setLocation] = useState(null);
  const [postCategory, setPostCategory] = useState(null);
  const [imageVideoLink, setImageVideoLink] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPath, setThumbnailPath] = useState(null);
  const [mongoId, setMongoId] = useState("");
  const [image, setImage] = useState();
  const [imagePath, setImagePath] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoPath, setVideoPath] = useState(null);
  const [error, setError] = useState({
    title: "",
    description: "",
    getMore: "",
    location: "",
    imageVideo: "",
  });

  useEffect(() => {
    props.getCategory();
  }, []);

  //set data in dialog
  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setTitle(dialogData.title);
      setDescription(dialogData.description);
      setLocation(dialogData.location);

      //Use website instead of getMore
      setGetMore(dialogData.getMore);
      setType(dialogData.type);
      setPostCategory(dialogData.categoryId);
      setThumbnailPath(dialogData.thumbnail);
      setThumbnail(dialogData.thumbnail);

      if (dialogData.type == 0) {
        setImagePath(dialogData.imageVideo);
        setImage(dialogData.imageVideo);
      } else if (dialogData.type == 1) {
        setVideoPath(dialogData.imageVideo);
        setVideo(dialogData.imageVideo);
      } else if (dialogData.type == 2) {
        setImageVideoLink(dialogData.imageVideo);
      }
    }
  }, []);

  useEffect(
    () => () => {
      setError({
        title: "",
        description: "",
        getMore: "",
        location: "",
        postCategory: "",
      });
      setTitle(null);
      setWebsite(null);
      setDescription("");
      setGetMore(null);
      setLocation(null);
      setVideoPath(null);
      setThumbnailPath(null);
      setImagePath(null);
      setPostCategory([]);
    },
    []
  );

  //  Thumbnail Load
  const thumbnailLoad = (event) => {
    if (event.target.files[0]) {
      setThumbnail(event.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setThumbnailPath(reader.result);
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Image Load
  const imageLoad = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Video Load
  const videoLoad = (event) => {
    if (event.target.files[0]) {
      setVideo(event.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setVideoPath(reader.result);
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  //close dialog
  const handleClose = () => {
    localStorage.removeItem("updatePostData");

    history.push("/admin/post");
  };

  //submit for insert and update
  const handleSubmit = () => {
    if (!title || !description || !getMore || !location || !postCategory) {
      const error = {};
      if (!title) error.title = "TItle is required !";
      if (!description) error.description = "Description is required !";
      if (!getMore) error.getMore = "Website is required !";
      if (!location) error.location = "Location is required !";
      if (!postCategory) error.postCategory = "Category is required !";

      return setError({ ...error });
    }

    if (!mongoId) {
      if (type == 0) {
        if (!image && !imagePath) {
          return setError({ ...error, imageVideo: "Image is required !" });
        }
      } else if (type == 1) {
        if (!video && !videoPath) {
          return setError({ ...error, imageVideo: "Video is required !" });
        }
      } else if (type == 2) {
        if (!imageVideoLink) {
          return setError({ ...error, imageVideo: "Link is required !" });
        }
      }
    }

    if (type == 0) {
      if (!image || !imagePath)
        return setError({ ...error, imageVideo: "Image is required !" });
    } else if (type == 1) {
      if (!video || !videoPath)
        return setError({ ...error, imageVideo: "Video is required !" });
    } else if (type == 2) {
      if (!imageVideoLink)
        return setError({ ...error, imageVideo: "Link is required !" });
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("getMore", getMore);
    formData.append("location", location);
    formData.append("categoryId", postCategory);
    formData.append(
      "imageVideo",
      type == 0 ? image : type == 1 ? video : type == 2 ? imageVideoLink : image
    );
    formData.append("website", website);
    formData.append("type", type);
    formData.append("thumbnail", thumbnail);

    if (!hasPermission) return permissionError();

    if (mongoId) {
      props.updatePost(mongoId, formData);
    } else {
      props.insertPost(formData);
    }

    setTimeout(() => {
      history.push("/admin/post");
    }, 2000);
  };

  return (
    <>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Post Dialog</h1>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/admin/dashboard">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to="/admin/post">Post</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Post Dialog
          </li>
        </ol>
      </div>

      <div class="row mb-3">
        <div class="col-lg-12">
          <div class="card mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <div class="modal-body pt-1 px-1 pb-3">
                <div class="d-flex flex-column">
                  <form>
                    <div class="form-group">
                      <div className="row">
                        <div className="col-md-12 my-2">
                          <label className="float-left styleForTitle">
                            Title
                          </label>
                          <input
                            type="text"
                            placeholder="Title"
                            className="form-control form-control-line"
                            required
                            value={title}
                            onChange={(e) => {
                              setTitle(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  title: "Title is required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  title: "",
                                });
                              }
                            }}
                          />
                          {error.title && (
                            <div className="pl-1 text-left">
                              <Typography
                                variant="caption"
                                color="error"
                                style={{ fontFamily: "Circular-Loom" }}
                              >
                                {error.title}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 my-2 styleForTitle">
                          <label htmlFor="description ">Description</label>
                          <SunEditor
                            value={description}
                            setContents={description}
                            ref={editor}
                            height={300}
                            onChange={(e) => {
                              setDescription(e);

                              if (!e) {
                                return setError({
                                  ...error,
                                  description: "Description is required !",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  description: "",
                                });
                              }
                            }}
                            placeholder="Description"
                            setOptions={{
                              buttonList: [
                                ["undo", "redo"],
                                ["font", "fontSize", "formatBlock"],

                                ["fontColor", "hiliteColor", "textStyle"],
                                ["removeFormat"],
                                [
                                  "bold",
                                  "underline",
                                  "italic",
                                  "subscript",
                                  "superscript",
                                ],

                                ["align", "list", "lineHeight"],
                                ["link"],
                                ["fullScreen"],
                              ],
                            }}
                          />
                          {error.description && (
                            <div className="pl-1 text-left">
                              <Typography
                                variant="caption"
                                color="error"
                                style={{ fontFamily: "Circular-Loom" }}
                              >
                                {error.description}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 my-2">
                          <label class="float-left styleForTitle">
                            Location
                          </label>
                          <input
                            type="text"
                            placeholder="Location"
                            class="form-control form-control-line"
                            required
                            value={location}
                            onChange={(e) => {
                              setLocation(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  location: "Location is required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  location: "",
                                });
                              }
                            }}
                          />
                          {error.location && (
                            <div class="pl-1 text-left">
                              <Typography
                                variant="caption"
                                color="error"
                                style={{ fontFamily: "Circular-Loom" }}
                              >
                                {error.location}
                              </Typography>
                            </div>
                          )}
                        </div>
                        <div className="col-md-6 my-2">
                          <label class="float-left styleForTitle">
                            Website
                          </label>
                          <input
                            type="text"
                            placeholder="website"
                            class="form-control form-control-line"
                            required
                            value={getMore}
                            onChange={(e) => {
                              setGetMore(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  getMore: "Website is required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  getMore: "",
                                });
                              }
                            }}
                          />
                          {error.getMore && (
                            <div class="pl-1 text-left">
                              <Typography
                                variant="caption"
                                color="error"
                                style={{ fontFamily: "Circular-Loom" }}
                              >
                                {error.getMore}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 my-2">
                          <label class="float-left styleForTitle">
                            Thumbnail
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            accept="image/*"
                            required=""
                            onChange={thumbnailLoad}
                          />

                          {thumbnailPath && (
                            <>
                              <img
                                height="100px"
                                width="100px"
                                alt="app"
                                src={thumbnailPath}
                                draggable="false"
                                style={{
                                  boxShadow:
                                    "0 5px 15px 0 rgb(105 103 103 / 50%)",
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

                        <div className="col-md-6 my-2 styleForTitle">
                          <label htmlFor="earning">Post Category</label>
                          <select
                            name="type"
                            class="form-control form-control-line"
                            id="type"
                            value={postCategory}
                            onChange={(e) => {
                              setPostCategory(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  postCategory: "Category is required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  postCategory: "",
                                });
                              }
                            }}
                          >
                            <option>---Select Category---</option>

                            {category.length > 0 &&
                              category.map((value) => {
                                return (
                                  <option value={value._id}>
                                    {value.name}
                                  </option>
                                );
                              })}
                          </select>
                          {error.postCategory && (
                            <div class="pl-1 text-left">
                              <Typography
                                variant="caption"
                                color="error"
                                style={{ fontFamily: "Circular-Loom" }}
                              >
                                {error.postCategory}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 my-2">
                          <label class="float-left styleForTitle">Type</label>
                          <select
                            id="contentType"
                            name="contentType"
                            class="form-control form-control-line"
                            required
                            value={type}
                            onChange={(e) => {
                              setType(e.target.value);
                            }}
                          >
                            <option value={0}>Image </option>
                            <option value={1}>Video </option>
                            <option value={2}>YouTube</option>
                          </select>
                        </div>

                        <div className="col-md-6 my-2">
                          <label class="float-left styleForTitle">
                            Image / Video / Link
                          </label>
                          {type == 0 && (
                            <>
                              <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                required=""
                                onChange={imageLoad}
                              />
                              {imagePath && (
                                <>
                                  <img
                                    height="100px"
                                    width="100px"
                                    alt="app"
                                    src={imagePath}
                                    draggable="false"
                                    style={{
                                      boxShadow:
                                        "0 5px 15px 0 rgb(105 103 103 / 50%)",
                                      border: "2px solid #fff",
                                      borderRadius: 10,
                                      marginTop: 10,
                                      float: "left",
                                    }}
                                  />

                                  <div
                                    class="img-container"
                                    style={{
                                      display: "inline",
                                      position: "relative",
                                      float: "left",
                                    }}
                                  ></div>
                                </>
                              )}
                            </>
                          )}
                          {type == 1 && (
                            <>
                              <input
                                type="file"
                                className="form-control"
                                required=""
                                accept="video/*"
                                onChange={videoLoad}
                              />
                              {videoPath && (
                                <>
                                  <video
                                    height="100px"
                                    width="100px"
                                    alt="app"
                                    src={videoPath}
                                    draggable="false"
                                    controls="true"
                                    style={{
                                      boxShadow:
                                        "0 5px 15px 0 rgb(105 103 103 / 50%)",
                                      border: "2px solid #fff",
                                      borderRadius: 10,
                                      marginTop: 10,
                                      float: "left",
                                    }}
                                  />

                                  <div
                                    class="img-container"
                                    style={{
                                      display: "inline",
                                      position: "relative",
                                      float: "left",
                                    }}
                                  ></div>
                                </>
                              )}
                            </>
                          )}
                          {type == 2 && (
                            <>
                              <input
                                type="text"
                                id="link"
                                placeholder="Link"
                                class="form-control "
                                value={imageVideoLink}
                                onChange={(e) => {
                                  setImageVideoLink(e.target.value);
                                }}
                              />
                            </>
                          )}
                          {error.imageVideo && (
                            <div class="pl-1 text-left">
                              <Typography
                                variant="caption"
                                color="error"
                                style={{ fontFamily: "Circular-Loom" }}
                              >
                                {error.imageVideo}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <DialogActions>
                      {dialogData ? (
                        <button
                          type="button"
                          class="btn btn-success  px-3"
                          onClick={handleSubmit}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          type="button"
                          class="btn btn-success  px-3"
                          onClick={handleSubmit}
                        >
                          Insert
                        </button>
                      )}
                      <button
                        type="button"
                        class="btn btn-danger  px-3"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </DialogActions>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { getCategory, insertPost, updatePost })(
  PostDialog
);
