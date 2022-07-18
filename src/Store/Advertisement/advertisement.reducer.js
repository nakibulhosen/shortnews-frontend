import {
  DELETE_OWN_AD,
  GET_OWN_AD,
  INSERT_OWN_AD,
  UPDATE_OWN_AD,
  OPEN_OWN_AD_DIALOG,
  CLOSE_OWN_AD_DIALOG,
  GET_GOOGLE_AD,
  UPDATE_GOOGLE_AD,
  SHOW_GOOGLE_AD,
  SHOW_OWN_AD,
  GET_OWN_AD_BY_TIME,
} from "./advertisement.type";

const initialState = {
  ownAd: [],
  googleAd: [],
  dialogData: null,
};

export const advertisementReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get ownAd
    case GET_OWN_AD:
      return {
        ...state,
        ownAd: action.payload,
      };
    case GET_GOOGLE_AD:
      return {
        ...state,
        googleAd: action.payload,
      };

    //Insert ownAd
    case INSERT_OWN_AD:
      const data = [...state.ownAd];
      data.unshift(action.payload);
      return {
        ...state,
        ownAd: data,
      };

    //Update ownAd
    case UPDATE_OWN_AD:
      return {
        ...state,
        ownAd: state.ownAd.map((ownAd) =>
          ownAd._id === action.payload.mid ? action.payload.data : ownAd
        ),
      };

    //Update GoogleAd
    case UPDATE_GOOGLE_AD:
      return {
        ...state,
        googleAd: action.payload.data,
      };

    //Delete ownAd
    case DELETE_OWN_AD:
      return {
        ...state,
        ownAd: state.ownAd.filter((ownAd) => ownAd._id !== action.payload),
      };

    //Get ownAd By Time
    case GET_OWN_AD_BY_TIME:
      return {
        ...state,
        ownAd: action.payload,
      };

    //GoogleAd Show
    case SHOW_GOOGLE_AD:
      return {
        ...state,
        googleAd: action.payload,
      };

    //OwnAd Show
    case SHOW_OWN_AD:
      return {
        ...state,
        ownAd: state.ownAd.map((ad) => {
          if (ad._id === action.payload._id)
            return {
              ...ad,
              show: action.payload.show,
            };
          else return ad;
        }),
      };

    //Open and Close Dialog
    case OPEN_OWN_AD_DIALOG:
      return {
        ...state,

        dialogData: action.payload || null,
      };

    case CLOSE_OWN_AD_DIALOG:
      return {
        ...state,
        dialogData: null,
      };

    default:
      return state;
  }
};
