import { createSlice } from "@reduxjs/toolkit";

// 유지해야할 데이터(사번)
const initState = {
  employeeNumber: ""
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  // 입력값과 출력값이 있다
  //입력값은 action : --해줘
  //출력(return)값 : 계속 유지해야하는 데이터
  reducers: {
    login: (state,action) => {
        console.log("login.....");
        console.log("-----------------------");
        console.log("state값은?", state);
        console.log("-----------------------");
        console.log("action의 값은?", action);
        console.log("-----------------------");
        console.log("action.payload 값은?", action.payload);
    },
    logout: () => {
      console.log("logout ........");
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
