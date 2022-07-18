//Types
import { GET_SETTING } from "./setting.type";

//Define initialState
const initialState = {
  setting: [],
};

export const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get User
    case GET_SETTING:
      return {
        ...state,
        setting: action.payload,
      };

    default:
      return state;
  }
};
