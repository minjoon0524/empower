import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";

export default configureStore({
  reducer: {
// 앱 전체에 영향을 끼칠 수 있는 
"loginSlice":loginSlice
  },
});
