//react
import React, { useEffect, useRef, useState } from "react";

//react-router-dom
import { Link, useHistory } from "react-router-dom";

//MUI
import { DialogActions, Typography } from "@material-ui/core";

//Actions
import {
  insertOwnAd,
  updateOwnAd,
  showOwnAd,
  deleteOwnAdImage,
} from "../../Store/Advertisement/advertisement.action";

// react dropzone
import ReactDropzone from "react-dropzone";

//editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

//redux
import { connect, useSelector } from "react-redux";

//baseURL
import { baseURL } from "../../util/Config";
import { permissionError } from "../../util/Alert";

const OwnAdDialog = (props) => {
  //For sun editor
  const editor = useRef(null);
  const hasPermission = useSelector((state) => state.admin.flag);

  //useSelector
  const dialogData = JSON.parse(localStorage.getItem("updateOwnAdData"));
  const history = useHistory();

  //define state
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [url, setUrl] = useState("");
  const [type, setType] = useState(0);
  const [publisherName, setPublisherName] = useState(null);
  const [publisherLogo, setPublisherLogo] = useState([]);
  const [publisherLogoPath, setPublisherLogoPath] = useState("");
  const [mongoId, setMongoId] = useState("");
  const [error, setError] = useState({
    title: "",
    url: "",
  });

  //set data in dialog
  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setTitle(dialogData.title);
      setDescription(dialogData.description);
      setUrl(dialogData.url);
      setType(dialogData.type);
      setPublisherLogoPath(baseURL + dialogData.publisherLogo);
      setPublisherName(dialogData.publisherName);
      setImage(dialogData.image);
    }
  }, []);

  useEffect(
    () => () => {
      setError({
        title: "",
        url: "",
        image: "",
      });
      setMongoId("");
      setTitle("");
      setUrl("");
      setDescription("");
      setImage([]);
      setPublisherLogo([]);
    },
    []
  );

  //onPreviewDrop function
  const onPreviewDrop = (files) => {
    setError({ ...error, image: "" });
    files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setImage(image.concat(files));
  };

  //Remove Image
  const removeImage = (index, file) => {
    if (mongoId && image.length === 1) {
      return setError({ ...error, image: "Select At least 1 Image!" });
    }
    setError({ ...error, image: "" });
    if (file.preview) {
      const imageData = image.filter((ele) => {
        return ele.preview !== file.preview;
      });
      setImage(imageData);
    } else {
      if (mongoId) {
        if (!hasPermission) return permissionError();
        fetch(
          `${baseURL}ownAd/delete/${mongoId}?position=${index}&key=wiZsLE1M7KWYc5zkkadlZ4e6OSnUcGcd`,
          { method: "DELETE" }
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.status) {
              const images = image.filter((ele) => {
                return ele != file;
              });

              setImage(images);
            }
          })
          .catch((error) => console.log(error));
      }
    }
  };

  //Handle Publisher Logo Function
  const handlePublisherLogo = (event) => {
    if (event.target.files[0]) {
      setPublisherLogo(event.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPublisherLogoPath(reader.result);
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  //close dialog
  const handleClose = () => {
    localStorage.removeItem("updatePostData");
    history.push("/admin/customAd");
  };

  //Handle Submit Function for insert and update
  const handleSubmit = () => {
    if (!title || !url || !image) {
      const error = {};
      if (!title) error.title = "TItle is Required !";
      if (!url) error.url = "Url is Required !";
      if (image.length === 0) error.image = "Image is Required!";

      return setError({ ...error });
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("url", url);
    formData.append("description", description);
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }
    formData.append("publisherLogo", publisherLogo);
    formData.append("publisherName", publisherName);
    formData.append("type", type);

    if (!hasPermission) return permissionError();

    if (mongoId) {
      props.updateOwnAd(mongoId, formData);
    } else {
      props.insertOwnAd(formData);
    }

    history.push("/admin/customAd");
  };

  return (
    <>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">CustomAd Dialog</h1>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/admin/dashboard">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to="/admin/customAd">CustomAd</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            CustomAd Dialog
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
                          <label class="float-left styleForTitle">Title</label>
                          <input
                            type="text"
                            placeholder="Title"
                            class="form-control form-control-line"
                            Required
                            value={title}
                            onChange={(e) => {
                              setTitle(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  title: "Title is Required!",
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
                            <div class="pl-1 text-left">
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
                        <div class="col-md-12 my-2 styleForTitle">
                          <label htmlFor="description ">Description</label>
                          <SunEditor
                            value={description}
                            setContents={description}
                            ref={editor}
                            height={300}
                            onChange={(e) => {
                              setDescription(e);
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
                            <div class="pl-1 text-left">
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
                            Publisher Name
                          </label>
                          <input
                            type="text"
                            placeholder="Publisher Name"
                            class="form-control form-control-line"
                            Required
                            value={publisherName}
                            onChange={(e) => {
                              setPublisherName(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-md-6 my-2">
                          <label class="float-left styleForTitle">
                            Publisher Logo
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            accept="image/*"
                            Required=""
                            onChange={handlePublisherLogo}
                          />

                          {publisherLogoPath && (
                            <>
                              <img
                                height="100px"
                                width="100px"
                                alt="app"
                                src={publisherLogoPath}
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
                      </div>

                      <div className="row">
                        <div className="col-md-6 my-2">
                          <label class="float-left styleForTitle">Url</label>
                          <input
                            type="text"
                            placeholder="Url"
                            class="form-control form-control-line"
                            Required
                            value={url}
                            onChange={(e) => {
                              setUrl(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  url: "Url is Required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  url: "",
                                });
                              }
                            }}
                          />
                          {error.url && (
                            <div class="pl-1 text-left">
                              <Typography
                                variant="caption"
                                color="error"
                                style={{ fontFamily: "Circular-Loom" }}
                              >
                                {error.url}
                              </Typography>
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 my-2">
                          <label class="float-left styleForTitle">Type</label>
                          <select
                            id="contentType"
                            name="contentType"
                            class="form-control form-control-line"
                            Required
                            value={type}
                            onChange={(e) => {
                              setType(e.target.value);
                            }}
                          >
                            <option value={0}>
                              Native [ with title and description]
                            </option>
                            <option value={1}>Full screen </option>
                          </select>
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-lg-2">
                          <label
                            className="form-control-label"
                            for="input-username"
                          >
                            Select (Multiple) Images
                          </label>

                          <>
                            <ReactDropzone
                              onDrop={(acceptedFiles) =>
                                onPreviewDrop(acceptedFiles)
                              }
                              accept="image/*"
                            >
                              {({ getRootProps, getInputProps }) => (
                                <section>
                                  <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div
                                      style={{
                                        height: 130,
                                        width: 130,
                                        border: "2px dashed gray",
                                        textAlign: "center",
                                        marginTop: "10px",
                                      }}
                                    >
                                      <i
                                        className="fas fa-plus"
                                        style={{ paddingTop: 30, fontSize: 70 }}
                                      ></i>
                                    </div>
                                  </div>
                                </section>
                              )}
                            </ReactDropzone>

                            {error.image && (
                              <div className="ml-2 mt-1">
                                {error.image && (
                                  <div className="pl-1 text__left">
                                    <Typography
                                      variant="caption"
                                      color="error"
                                      style={{ fontFamily: "Circular-Loom" }}
                                    >
                                      {error.image}
                                    </Typography>
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        </div>
                        <div className="col-lg-10 mt-4">
                          {image.length > 0 &&
                            image.map((file, index) => {
                              return file.type?.split("image")[0] === "" ? (
                                <>
                                  <img
                                    height="60px"
                                    width="60px"
                                    alt="app"
                                    draggable="false"
                                    src={
                                      file.preview
                                        ? file.preview
                                        : baseURL + file.image
                                    }
                                    style={{
                                      boxShadow:
                                        "0 5px 15px 0 rgb(105 103 103 / 00%)",
                                      border: "2px solid #fff",
                                      borderRadius: 10,
                                      marginTop: 10,
                                      float: "left",
                                      objectFit: "contain",
                                      marginRight: 15,
                                    }}
                                  />
                                  <div
                                    class="img-container"
                                    style={{
                                      display: "inline",
                                      position: "relative",
                                      float: "left",
                                    }}
                                  >
                                    <i
                                      class="fas fa-times-circle"
                                      style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "4px",
                                        cursor: "pointer",
                                        color: "#6777ef",
                                      }}
                                      onClick={() => removeImage(index, file)}
                                    ></i>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <img
                                    height="60px"
                                    width="60px"
                                    alt="app"
                                    draggable="false"
                                    src={baseURL + file}
                                    style={{
                                      boxShadow:
                                        "0 5px 15px 0 rgb(105 103 103 / 00%)",
                                      border: "2px solid #fff",
                                      borderRadius: 10,
                                      marginTop: 10,
                                      float: "left",
                                      objectFit: "contain",
                                      marginRight: 15,
                                    }}
                                  />
                                  <div
                                    class="img-container"
                                    style={{
                                      display: "inline",
                                      position: "relative",
                                      float: "left",
                                    }}
                                  >
                                    <i
                                      class="fas fa-times-circle"
                                      style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "4px",
                                        cursor: "pointer",
                                        color: "#6777ef",
                                      }}
                                      onClick={() => removeImage(index, file)}
                                    ></i>
                                  </div>
                                </>
                              );
                            })}
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

export default connect(null, {
  insertOwnAd,
  updateOwnAd,
  showOwnAd,
  deleteOwnAdImage,
})(OwnAdDialog);
