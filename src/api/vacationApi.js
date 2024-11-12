import axios from "axios";
import jwtAxios from "../util/jwtUtil";

const API_SERVER_HOST = `http://localhost:80`;
const host = `${API_SERVER_HOST}`;

// 전체 회원 휴가 리스트를 가져오는 함수
export const getMemberVacationList = async (pageParam) => {
    const {page,size} = pageParam
    const res = await jwtAxios.get(`${API_SERVER_HOST}/vacation/list`, {params: {page:page,size:size }});
    console.log("============== 휴가 전체 리스트 조회(전회원, 관리자용) ============== ", res.data);
  
    return res.data;
  };

  // 승인 or 거절  
  export const approveVacation = async (vacation) => {

    const res = await jwtAxios.post(`${API_SERVER_HOST}/vacation/approve`,vacation);
    console.log("============== 승인 or 거절 ============== ", res.data);
  
    return res.data;
  };


  // 휴가 신청
  export const registerVacation = async (vacation) => {

    const res = await axios.post(`${API_SERVER_HOST}/vacation/register`,vacation);
    console.log("============== 휴가 신청 ============== ", res.data);
  
    return res.data;
  };
