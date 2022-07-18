import { CLICK_LOCATION } from "./click.type";

const initialState = {
  click: [],
};

export const clickReducer = (state = initialState, action) => {
  switch (action.type) {
    //Location Wise Impression
    case CLICK_LOCATION:
      return {
        ...state,
        click: action.payload,
      };

    default:
      return state;
  }
};
