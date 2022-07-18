import { IMPRESSION_LOCATION } from "./impression.type";

const initialState = {
  impression: [],
};

export const impressionReducer = (state = initialState, action) => {
  switch (action.type) {
    //Location Wise Impression
    case IMPRESSION_LOCATION:
      return {
        ...state,
        impression: action.payload,
      };

    default:
      return state;
  }
};
