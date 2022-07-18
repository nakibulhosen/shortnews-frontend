//Axios
import axios from "axios";
import { baseURL, devKey } from "../../util/Config";

//Types
import {
  GET_USER,
  GET_USER_PAGINATION,
  SEARCH_DATA,
  USER_DETAILS,
} from "./user.type";

//Get User
export const getUser = () => (dispatch) => {
  axios
    .get(`user`)
    .then((res) => {
      dispatch({ type: GET_USER, payload: res.data.user });
    })
    .catch((error) => {
      console.log(error);
    });
};

//GEt User Pagination
export const getUserPagination = (page, size) => (dispatch) => {
  axios
    .get(`user/userPagination?page=${page}&size=${size}`)
    .then((res) => {
      dispatch({
        type: GET_USER_PAGINATION,
        payload: { data: res.data.user, total: res.data.total },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

//Search API
export const search = (search, page, size) => (dispatch) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", key: devKey },
    // query: JSON.stringify(content),
  };
  fetch(
    `${baseURL}user/search?search=${search}&page=${page}&size=${size}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SEARCH_DATA,
        payload: { data: res.user, total: res.total },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

//Get User Details
export const getUserDetails = (id) => (dispatch) => {
  axios
    .get(`user/details?userId=${id}`)
    .then((res) => {
      dispatch({ type: USER_DETAILS, payload: res.data.user });
    })
    .catch((error) => {
      console.log(error);
    });
};
