//axios
import axios from "axios";
import { setToast } from "../../util/Toast";

//types
import {
  CLEAR_LOGIN_ERROR,
  SET_ADMIN,
  UPDATE_PROFILE,
  UPDATE_PROFILE_NAME,
} from "./admin.type";

//Login action
export const login = (details) => (dispatch) => {
  dispatch({ type: CLEAR_LOGIN_ERROR });
  axios
    .post("admin/login", details)
    .then((res) => {
      dispatch({ type: SET_ADMIN, payload: res.data.token });
    })
    .catch((response) => {
      if (response?.response?.data.message) {
        setToast("error", response.response.data.message);
      }
    });
};

//Get admin Profile action
export const getProfile = () => (dispatch) => {
  axios
    .get(`admin`)
    .then((res) => {
      dispatch({ type: UPDATE_PROFILE, payload: res.data.admin });
    })
    .then((error) => {
      console.log(error);
    });
};

//Update Image
export const updateImage = (formData) => (dispatch) => {
  axios
    .patch(`admin/updateImage`, formData)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: UPDATE_PROFILE, payload: res.data.admin });

        setToast("success", "Image Updated Successfully ✔");
      } else {
        setToast("error", res.data.message);
      }
    })
    .then((error) => {
      console.log(error);
    });
};

//Update Email and Name
export const updateProfile = (content) => (dispatch) => {
  axios
    .patch(`admin`, content)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: UPDATE_PROFILE_NAME, payload: res.data.admin });
        setToast("success", "Admin Profile Updated Successfully ✔");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
