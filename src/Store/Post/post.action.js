//axios
import axios from "axios";
import { baseURL, devKey } from "../../util/Config";
import { setToast } from "../../util/Toast";

//type
import {
  INSERT_POST,
  UPDATE_POST,
  DELETE_POST,
  TOGGLE_API,
  GET_TOGGLE_API,
  GET_POST_PAGINATION,
} from "./post.type";

//insert Post
export const insertPost = (content) => (dispatch) => {
  axios
    .post(`post/create`, content)
    .then((result) => {
      if (result.data.status) {
        dispatch({ type: INSERT_POST, payload: result.data.post });
        setToast("success", "Post Inserted Successfully ✔");
      } else {
        setToast("error", result.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//update course
export const updatePost = (mid, content) => (dispatch) => {
  axios
    .patch(`post/update/${mid}`, content)
    .then((result) => {
      if (result.data.status) {
        dispatch({
          type: UPDATE_POST,
          payload: { data: result.data.post, id: mid },
        });
        setToast("success", "Post Updated Successfully ✔");
      } else {
        setToast("error", result.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//delete post
export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`post/delete/${id}`)
    .then((result) => {
      dispatch({ type: DELETE_POST, payload: id });
    })
    .catch((error) => {
      console.log(error);
    });
};

//ToggleAPI Change Value
export const changeToggleAPI = () => (dispatch) => {
  axios
    .put(`setting/toggleAPI`)
    .then((res) => {
      dispatch({ type: TOGGLE_API, payload: res.data });
      setToast("success", "Data Updated Successfully ✔");
    })
    .catch((error) => {
      console.log(error);
    });
};

//ToggleAPI Get Value
export const getToggleAPI = () => (dispatch) => {
  axios
    .get(`setting/getToggleAPI`)
    .then((res) => {
      dispatch({ type: GET_TOGGLE_API, payload: res.data });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getPostPagination = (page, size, search) => (dispatch) => {
  const requestOptions = {
    method: "GET",
  };
  fetch(
    `${baseURL}post/getPostPagination?key=${devKey}&start=${page}&limit=${size}&search=${search}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.status) {
        dispatch({
          type: GET_POST_PAGINATION,
          payload: { data: res.post, total: res.total },
        });
      } else {
        setToast("error", res.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
