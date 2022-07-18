//react
import React, { useEffect, useState } from "react";

// material-ui
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Tooltip,
} from "@material-ui/core";
import Cancel from "@material-ui/icons/Cancel";

//react-redux
import { useDispatch, useSelector, connect } from "react-redux";

//action
import { insertCategory, updateCategory } from "../../Store/Category/action";

//types
import { CLOSE_DIALOG } from "../../Store/Category/type";
import { permissionError } from "../../util/Alert";

const CategoryDialog = (props) => {
  //useSelector
  const { dialog: open, dialogData } = useSelector((state) => state.category);
  const hasPermission = useSelector((state) => state.admin.flag);

  const dispatch = useDispatch();

  //define states
  const [name, setName] = useState("");
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [mongoId, setMongoId] = useState("");
  const [error, setError] = useState({
    name: "",
    image: "",
  });

  //Set Data Value
  useEffect(() => {
    if (dialogData) {
      setName(dialogData.name);
      setImagePath(dialogData.image);
      setMongoId(dialogData._id);
    }
  }, [dialogData]);

  //Empty Data After Insert
  useEffect(
    () => () => {
      setName("");
      setImagePath("");
      setMongoId("");
      setError({
        url: "",
        image: "",
      });
    },
    [open]
  );

  //Update Function
  const handleSubmit = () => {
    if (!name) {
      const error = {};

      if (!name) error.name = "Name is Required !";

      if (image.length === 0) error.image = "Image is Required !";

      return setError({ ...error });
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", image);
    if (!hasPermission) return permissionError();

    if (mongoId) {
      props.updateCategory(formData, mongoId);
    } else {
      props.insertCategory(formData);
    }
  };

  //Close Dialog
  const handleClose = () => {
    dispatch({ type: CLOSE_DIALOG });
  };

  //  Image Load
  const imageLoad = (event) => {
    setImage(event.target.files[0]);

    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={handleClose}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="responsive-dialog-title">Category</DialogTitle>

        <IconButton
          style={{
            position: "absolute",
            right: 0,
            color: "#2a3042",
          }}
        >
          <Tooltip title="Close">
            <Cancel className="cancelButton" onClick={handleClose} />
          </Tooltip>
        </IconButton>
        <DialogContent>
          <div class="modal-body pt-1 px-1 pb-3">
            <div class="d-flex flex-column">
              <form>
                <div class="form-group">
                  <div className="row">
                    <div className="col-md-12 my-2">
                      <label class="float-left styleForTitle">Name</label>
                      <input
                        type="text"
                        placeholder="Name"
                        class="form-control form-control-line"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...error,
                              name: "name is Required!",
                            });
                          } else {
                            return setError({
                              ...error,
                              name: "",
                            });
                          }
                        }}
                      />

                      {error.name && (
                        <div class="pl-1 text-left">
                          <Typography
                            variant="caption"
                            color="error"
                            style={{ fontFamily: "Circular-Loom" }}
                          >
                            {error.name}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 my-2">
                      <label class="float-left styleForTitle">Image</label>
                      <input
                        type="file"
                        class="form-control"
                        accept="image/*"
                        required=""
                        onChange={imageLoad}
                      />
                      {error.image && (
                        <div class="pl-1 text-left">
                          <Typography
                            variant="caption"
                            color="error"
                            style={{ fontFamily: "Circular-Loom" }}
                          >
                            {error.image}
                          </Typography>
                        </div>
                      )}
                      {imagePath && (
                        <>
                          <img
                            height="100px"
                            width="100px"
                            alt="app"
                            draggable="false"
                            src={imagePath}
                            style={{
                              boxShadow: "0 5px 15px 0 rgb(105 103 103 / 50%)",
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default connect(null, { insertCategory, updateCategory })(
  CategoryDialog
);
