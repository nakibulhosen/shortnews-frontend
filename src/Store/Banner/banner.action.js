//Axios
import axios from "axios";

import { setToast } from "../../util/Toast";
import {
  CLOSE_BANNER_DIALOG,
  DELETE_BANNER,
  GET_BANNER,
  INSERT_BANNER,
  UPDATE_BANNER,
} from "./banner.type";

//Get Banner
export const getBanner = () => (dispatch) => {
  axios
    .get(`banner`)
    .then((res) => {
      dispatch({ type: GET_BANNER, payload: res.data.banner });
    })
    .then((error) => {
      console.log(error);
    });
};

//Insert Banner
export const insertBanner = (content) => (dispatch) => {
  axios
    .post(`banner/create`, content)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: INSERT_BANNER, payload: res.data.banner });
        dispatch({ type: CLOSE_BANNER_DIALOG });
        setToast("success", "Banner Inserted Successfully ✔");
      } else {
        setToast("error", res.data.message);
      }
    })
    .then((error) => {
      console.log(error);
    });
};

//Update Banner
export const updateBanner = (content, id) => (dispatch) => {
  axios
    .patch(`banner/update/${id}`, content)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: UPDATE_BANNER,
          payload: { data: res.data.banner, mid: id },
        });
        dispatch({ type: CLOSE_BANNER_DIALOG });
        setToast("success", "Banner Updated Successfully ✔");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//Delete Banner
export const deleteBanner = (id) => (dispatch) => {
  axios
    .delete(`banner/delete/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_BANNER, payload: id });
    })
    .catch((error) => {
      console.log(error);
    });
};
