//Axios
import axios from "axios";

import { setToast } from "../../util/Toast";

//Types
import {
  CLOSE_DIALOG,
  DELETE_CATEGORY,
  GET_CATEGORY,
  INSERT_CATEGORY,
  UPDATE_CATEGORY,
} from "./type";

//Get CATEGORY
export const getCategory = () => (dispatch) => {
  axios
    .get(`category`)
    .then((res) => {
      dispatch({ type: GET_CATEGORY, payload: res.data.category });
    })
    .then((error) => {
      console.log(error);
    });
};

//Insert CATEGORY
export const insertCategory = (content) => (dispatch) => {
  axios
    .post(`category/create`, content)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: INSERT_CATEGORY, payload: res.data.category });
        dispatch({ type: CLOSE_DIALOG });
        setToast("success", "Category Inserted Successfully ✔");
      } else {
        setToast("error", res.data.message);
      }
    })
    .then((error) => {
      console.log(error);
    });
};

//Update category
export const updateCategory = (content, id) => (dispatch) => {
  axios
    .patch(`category/update/${id}`, content)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: UPDATE_CATEGORY,
          payload: { data: res.data.category, mid: id },
        });
        dispatch({ type: CLOSE_DIALOG });
        setToast("success", "Update Category Successfully ✔");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//Delete category
export const deleteCategory = (id) => (dispatch) => {
  axios
    .delete(`category/delete/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_CATEGORY, payload: id });
    })
    .catch((error) => {
      console.log(error);
    });
};
