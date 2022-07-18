//Types
import { CLOSE_DIALOG } from "../Category/type";
import {
  OPEN_DIALOG,
  INSERT_POST,
  DELETE_POST,
  UPDATE_POST,
  TOGGLE_API,
  GET_TOGGLE_API,
  GET_POST_PAGINATION,
} from "./post.type";

//Define InitialState
const initialState = {
  post: [],
  postDetails: {},
  dialog: false,
  dialogData: null,
  postToggleAPI: {},
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    //Insert Post
    case INSERT_POST:
      const data = [...state.post];
      data.unshift(action.payload);
      return {
        ...state,
        post: data,
      };

    //Update Post
    case UPDATE_POST:
      return {
        ...state,
        post: state.post.map((post) =>
          post._id === action.payload.id ? action.payload.data : post
        ),
      };

    //Delete post
    case DELETE_POST:
      return {
        ...state,
        post: state.post.filter((post) => post._id !== action.payload),
      };

    //Open and Close Dialog
    case OPEN_DIALOG:
      return {
        ...state,
        dialogData: action.payload || null,
      };

    case CLOSE_DIALOG:
      return {
        ...state,
        dialogData: null,
      };

    //Toggle API
    case TOGGLE_API:
      return {
        ...state,
        postToggleAPI: action.payload.toggleAPI,
      };

    //Get toggle api
    case GET_TOGGLE_API:
      return {
        ...state,
        postToggleAPI: action.payload.toggleAPI,
      };

    //Get User Pagination
    case GET_POST_PAGINATION:
      return {
        ...state,
        post: action.payload.data,
        total: action.payload.total,
      };

    default:
      return state;
  }
};
