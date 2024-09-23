import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginPost} from "../api/memberApi";
import {getCookie, removeCookie, setCookie} from "../util/CookieUtil";

// 유지해야할 데이터(사번)
const initState = {
  employeeNumber: "",
};
// 로그인 상태를 위한 쿠키 함수
const loadMemberCookie = () => {
  //쿠키에서 로그인 정보 로딩
  const memberInfo = getCookie("member");
  //닉네임 처리
  // if (memberInfo && memberInfo.nickname) {
  //   memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  // }
  return memberInfo;
};

// param은 employeeNumber,pw를 가지고 있다.
export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) =>
    loginPost(param)
);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadMemberCookie() || initState, //쿠키가 없다면 초깃값사용 //유지해야는 데이터
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
      removeCookie("member");
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

          if (!payload.error) {
            setCookie("member", JSON.stringify(payload)); //1일
          }
          return payload;
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
