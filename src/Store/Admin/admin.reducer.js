//Token and Key
import setToken from "../../util/setToken";
import setDevKey from "../../util/setDevKey";
import jwt_decode from "jwt-decode";
import { devKey } from "../../util/Config";

//Types
import {
  SET_ADMIN,
  UNSET_ADMIN,
  UPDATE_PROFILE,
  UPDATE_PROFILE_NAME,
  OPEN_ADMIN_TOAST,
  CLOSE_ADMIN_TOAST,
} from "./admin.type";

//Define initialStates
const initialState = {
  isAuth: false,
  user: {},
  toast: false,
  toastData: null,
  actionFor: null,
  flag: false,
};

const adminReducer = (state = initialState, action) => {
  let decoded;

  switch (action.type) {
    //Set admin
    case SET_ADMIN:
      if (action.payload) {
        decoded = jwt_decode(action.payload);
      }
      setToken(action.payload);
      setDevKey(devKey);
      sessionStorage.setItem("token", action.payload);
      sessionStorage.setItem("key", devKey);
      return {
        ...state,
        isAuth: true,
        user: decoded,
        flag: decoded.flag,
      };

    //unset admin
    case UNSET_ADMIN:
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("key");
      setDevKey(null);
      setToken(null);
      return {
        ...state,
        isAuth: false,
        user: {},
      };

    //Update admin Profile
    case UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state,
          id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
          image: action.payload.image,
        },
      };

    //Update Admin Name
    case UPDATE_PROFILE_NAME:
      return {
        ...state,
        user: action.payload,
      };

    //Open admin Toast
    case OPEN_ADMIN_TOAST:
      return {
        ...state,
        toast: true,
        toastData: action.payload.data || null,
        actionFor: action.payload.for || null,
      };

    //Close admin Toast
    case CLOSE_ADMIN_TOAST:
      return {
        ...state,
        toast: false,
        toastData: null,
        actionFor: null,
      };

    default:
      return state;
  }
};

export default adminReducer;
