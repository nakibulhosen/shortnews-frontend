//Types
import {
  CLOSE_BANNER_DIALOG,
  DELETE_BANNER,
  GET_BANNER,
  INSERT_BANNER,
  OPEN_BANNER_DIALOG,
  UPDATE_BANNER,
} from "./banner.type";

//Define InitialState
const initialState = {
  banner: [],
  dialog: false,
  dialogData: null,
};

export const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get Banner
    case GET_BANNER:
      return {
        ...state,
        banner: action.payload,
      };

    //Insert Banner
    case INSERT_BANNER:
      const data = [...state.banner];
      data.unshift(action.payload);
      return {
        ...state,
        banner: data,
      };

    //Update Banner
    case UPDATE_BANNER:
      return {
        ...state,
        banner: state.banner.map((banner) =>
          banner._id === action.payload.mid ? action.payload.data : banner
        ),
      };

    //Delete Banner
    case DELETE_BANNER:
      return {
        ...state,
        banner: state.banner.filter((banner) => banner._id !== action.payload),
      };

    //Open Dialog
    case OPEN_BANNER_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };

    case CLOSE_BANNER_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };

    default:
      return state;
  }
};
