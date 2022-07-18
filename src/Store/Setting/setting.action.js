import axios from "axios";
import { setToast } from "../../util/Toast";

//type
import { GET_SETTING, UPDATE_SETTING } from "./setting.type";

//GetSetting
export const getSetting = () => (dispatch) => {
  axios
    .get(`setting/`)
    .then((res) => {
      dispatch({ type: GET_SETTING, payload: res.data.setting });
    })
    .catch((error) => console.log(error));
};

//UpdateSetting
export const updateSetting = (content, id) => (dispatch) => {
  axios
    .patch(`setting/update/${id}`, content)
    .then((res) => {
      dispatch({ type: UPDATE_SETTING, payload: res.data.setting });
      if (res.data.status) {
        setToast("success", "Setting Updated Successfully ✔");
      } else {
        setToast("error", res.data.message);
      }
    })
    .catch((error) => console.log(error));
};
