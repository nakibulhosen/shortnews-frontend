import axios from "axios";
import { CLICK_LOCATION } from "./click.type";

//Get Location Impression Wise
export const locationWiseClick = (adId) => (dispatch) => {
  axios
    .get(`click/locationWiseClicks/${adId}`)
    .then((res) => {
      dispatch({ type: CLICK_LOCATION, payload: res.data.clicks });
    })
    .catch((error) => {
      console.log(error);
    });
};
