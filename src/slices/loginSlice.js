import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";

// 유지해야할 데이터(사번)
const initState = {
  employeeNumber: "",
};

// param은 employeeNumber,pw를 가지고 있다.
export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) =>
  loginPost(param)
);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  // 입력값과 출력값이 있다
  //입력값은 action : --해줘
  //출력(return)값 : 계속 유지해야하는 데이터
  reducers: {
    login: (state, action) => {
      console.log("login.....");
      console.log("-----------------------");
      console.log("state값은?", state);
      console.log("-----------------------");
      console.log("action의 값은?", action);
      console.log("-----------------------");
      console.log("action.payload 값은?", action.payload);
      return { employeeNumber: action.payload.employeeNumber };
    },
    logout: () => {
      console.log("logout ........");
      return { ...initState };
    },
  },
  // createAsyncThunk 사용을 위해
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled");
        const payload = action.payload;
        console.log(payload)
        // 다음 상태로 유지되어야 할 값
        return payload;
      })

      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
