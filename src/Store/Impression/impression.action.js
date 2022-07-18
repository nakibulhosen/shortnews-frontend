import axios from "axios";
import { IMPRESSION_LOCATION } from "./impression.type";

//Get Location Impression Wise
export const locationWiseImpression = (adId) => (dispatch) => {
  axios
    .get(`impression/locationWiseImpression/${adId}`)
    .then((res) => {
      dispatch({ type: IMPRESSION_LOCATION, payload: res.data.impressions });
    })
    .catch((error) => {
      console.log(error);
    });
};
