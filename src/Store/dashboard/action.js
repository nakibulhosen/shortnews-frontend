import axios from "axios";

import { GET_DASHBOARD } from "./types";

//Get dashboard details
export const getDashboard = () => (dispatch) => {
  axios
    .get("dashboard/totalCount")
    .then((res) => {
      dispatch({ type: GET_DASHBOARD, payload: res.data.dashboard });
    })
    .catch((error) => console.log(error));
};
