import axios from "axios";
import { getCookie,setCookie } from "./cookiesUtil";

const jwtAxios = axios.create();

// 엑세스 토큰을 가지고 전달해주는 axios
// 아무것도 없이 전달하는 axios
const refreshJWT = async (accessToken, refreshToken) => {
    const host = 'http://localhost';
    const header = { headers: { Authorization: `Bearer${accessToken}` } };
    const res = await axios.get(
        `${host}/refreshToken=${refreshToken}`,
        header
    );

    // 새로만들어진 accessToken,refreshToken
    console.log(res.data);

    return res.data;
};

// 요청 전
const beforeReq = (config) => {
    console.log("before request.............");

    const memberInfo = getCookie("member");
    if (!memberInfo) {
        console.log("Member NOT FOUND");
        return Promise.reject({ response: { data: { error: "REQUIRE_LOGIN" } } });
    }
    const { accessToken } = memberInfo;
    // Authorization 헤더 처리
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
};

// 요청 실패
const requestFail = (err) => {
    console.log("요청 오류............");
    return Promise.reject(err);
};

// 응답 전
const beforeRes = async (res) => {
    console.log("before return response...........")

    //console.log(res)

    //'ERROR_ACCESS_TOKEN'
    const data = res.data

    if(data && data.error ==='ERROR_ACCESS_TOKEN'){

        const memberCookieValue = getCookie("member")

        const result = await refreshJWT( memberCookieValue.accessToken, memberCookieValue.refreshToken )
        console.log("refreshJWT RESULT", result)

        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken

        setCookie("member", JSON.stringify(memberCookieValue), 1)

        //원래의 호출
        const originalRequest = res.config

        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`

        return await axios(originalRequest)

    }

    return res
}


// 응답 실패
const responseFail = (err) => {
    console.log("응답 실패 오류.............");
    return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
