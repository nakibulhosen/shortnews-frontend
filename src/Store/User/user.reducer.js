//Types
import {
  GET_USER,
  GET_USER_PAGINATION,
  SEARCH_DATA,
  USER_DETAILS,
} from "./user.type";

//Define initialState
const initialState = {
  user: [],
  total: 0,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get User
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    //Get User Details
    case USER_DETAILS:
      return {
        ...state,
        user: action.payload,
      };

    //Get User Pagination
    case GET_USER_PAGINATION:
      return {
        ...state,
        user: action.payload.data,
        total: action.payload.total,
      };

    //Search Data
    case SEARCH_DATA:
      return {
        ...state,
        user: action.payload.data,
        total: action.payload.total,
      };

    default:
      return state;
  }
};
