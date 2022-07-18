//Types
import {
  CLOSE_DIALOG,
  DELETE_CATEGORY,
  GET_CATEGORY,
  INSERT_CATEGORY,
  OPEN_DIALOG,
  UPDATE_CATEGORY,
} from "./type";

//Define InitialState
const initialState = {
  category: [],
  dialog: false,
  dialogData: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get Category
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    //Insert category
    case INSERT_CATEGORY:
      const data = [...state.category];
      data.unshift(action.payload);
      return {
        ...state,
        category: data,
      };

    //Update category
    case UPDATE_CATEGORY:
      return {
        ...state,
        category: state.category.map((category) =>
          category._id === action.payload.mid ? action.payload.data : category
        ),
      };

    //Delete category
    case DELETE_CATEGORY:
      return {
        ...state,
        category: state.category.filter(
          (category) => category._id !== action.payload
        ),
      };

    //Open Dialog
    case OPEN_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };

    case CLOSE_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };

    default:
      return state;
  }
};
