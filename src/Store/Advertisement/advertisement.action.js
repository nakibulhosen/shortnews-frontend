import axios from "axios";
import { setToast } from "../../util/Toast";

//types
import {
  DELETE_OEN_AD_IMAGE,
  DELETE_OWN_AD,
  GET_GOOGLE_AD,
  GET_OWN_AD,
  GET_OWN_AD_BY_TIME,
  INSERT_OWN_AD,
  SHOW_GOOGLE_AD,
  SHOW_OWN_AD,
  UPDATE_GOOGLE_AD,
  UPDATE_OWN_AD,
} from "./advertisement.type";

//  --------------------------------- Google Ad -------------------------------

//Get GoogleAd
export const getGoogleAd = () => (dispatch) => {
  axios
    .get(`google`)
    .then((res) => {
      dispatch({ type: GET_GOOGLE_AD, payload: res.data.google });
    })
    .then((error) => {
      console.log(error);
    });
};

//Update OwnAd
export const updateGoogleAd = (id, content) => (dispatch) => {
  axios
    .patch(`google/update/${id}`, content)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: UPDATE_GOOGLE_AD,
          payload: { data: res.data.google, mid: id },
        });

        setToast("success", "GoogleAd Updated ✔");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//show Toggle For GoogleAd
export const showGoogleAd = (id) => (dispatch) => {
  axios
    .put(`google/show/${id}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: SHOW_GOOGLE_AD, payload: res.data.google });
        setToast("success", "GoogleAd Updated Successfully ✔");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//  --------------------------------- Own Ad -------------------------------

//Get OwnAd
export const getOwnAd = () => (dispatch) => {
  axios
    .get(`ownAd`)
    .then((res) => {
      dispatch({ type: GET_OWN_AD, payload: res.data.ownAd });
    })
    .catch((error) => {
      console.log(error);
    });
};

//Insert OwnAd
export const insertOwnAd = (content) => (dispatch) => {
  axios
    .post(`ownAd/create`, content)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: INSERT_OWN_AD,
          payload: { ...res.data.ownAd, clicks: 0, impressions: 0 },
        });
        setToast("success", "OwnAd inserted Successfully ✔");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//Update OwnAd
export const updateOwnAd = (id, content) => (dispatch) => {
  axios
    .patch(`ownAd/update/${id}`, content)
    .then((res) => {
      if (res.data.status) {
        const data = JSON.parse(localStorage.getItem("updateOwnAdData"));
        dispatch({
          type: UPDATE_OWN_AD,
          payload: {
            data: {
              ...res.data.ownAd,
              clicks: data.clicks,
              impressions: data.impressions,
            },
            mid: id,
          },
        });
        setToast("success", "OwnAd Updated Successfully ✔");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//Delete OwnAd
export const deleteOwnAd = (id) => (dispatch) => {
  axios
    .delete(`ownAd/deleteOwnAd/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_OWN_AD, payload: id });
    })
    .catch((error) => {
      console.log(error);
    });
};

//show Toggle For OwnAD
export const showOwnAd = (id) => (dispatch) => {
  axios
    .put(`ownAd/show/${id}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: SHOW_OWN_AD, payload: res.data.ownAd });

        setToast("success", "OwnAd Updated Successfully ✔");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//Remove ownAd Image
export const deleteOwnAdImage = (id, position) => (dispatch) => {
  axios
    .delete(`ownAd/delete/${id}?position=${position}`)
    .then((res) => {
      dispatch({ type: DELETE_OEN_AD_IMAGE, payload: id });
    })
    .catch((error) => {
      console.log(error);
    });
};

//Get OwnAd Details using time [Analytics]
export const getOwnAdByTime = (content, id) => (dispatch) => {
  axios
    .get(
      `ownAd/getDataByTime/${id}?startDate=${content.startDate}&endDate=${content.endDate}`,
      content
    )
    .then((res) => {
      dispatch({ type: GET_OWN_AD_BY_TIME, payload: res.data.ownAd[0] });
    })
    .catch((error) => {
      console.log(error);
    });
};
