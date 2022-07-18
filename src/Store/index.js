//Redux
import { combineReducers } from "redux";

//Define All the Reducers
import adminReducer from "./Admin/admin.reducer";
import { advertisementReducer } from "./Advertisement/advertisement.reducer";
import { bannerReducer } from "./Banner/banner.reducer";
import { categoryReducer } from "./Category/reducer";
import { clickReducer } from "./Click/click.reducer";
import dashboardReducer from "./dashboard/reducer";
import { impressionReducer } from "./Impression/impression.reducer";
import spinnerReducer from "./Loader/loader.reducer";
import { postReducer } from "./Post/post.reducer";
import { settingReducer } from "./Setting/setting.reducer";
import { userReducer } from "./User/user.reducer";

export default combineReducers({
  admin: adminReducer,
  user: userReducer,
  category: categoryReducer,
  post: postReducer,
  advertisement: advertisementReducer,
  impression: impressionReducer,
  click: clickReducer,
  dashboard: dashboardReducer,
  spinner: spinnerReducer,
  setting: settingReducer,
  banner: bannerReducer,
});
