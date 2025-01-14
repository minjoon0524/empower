import axios from "axios";
import jwtAxios from "../util/jwtUtil";

const API_SERVER_HOST = `http://localhost:80`;
const host = `${API_SERVER_HOST}`;

// 전체 회원 휴가 리스트를 가져오는 함수
export const getMemberVacationList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${API_SERVER_HOST}/vacation/list`, {
    params: { page: page, size: size },
  });
  console.log(
    "============== 휴가 전체 리스트 조회(전회원, 관리자용) ============== ",
    res.data
  );

  return res.data;
};

// 승인 or 거절
export const approveVacation = async (vacation) => {
  const res = await jwtAxios.post(
    `${API_SERVER_HOST}/vacation/approve`,
    vacation
  );
  console.log("============== 승인 or 거절 ============== ", res.data);

  return res.data;
};

// 휴가 신청
export const registerVacation = async (vacation) => {
  const res = await jwtAxios.post(
    `${API_SERVER_HOST}/vacation/register`,
    vacation
  );
  console.log("============== 휴가 신청 ============== ", res.data);

  return res.data;
};

// 내 휴가 신청 내역
// /vacation/member/{eid}
export const getVacation = async (pageParam, eid) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${API_SERVER_HOST}/vacation/member/${eid}`, {
    params: { page: page, size: size },
  });
  console.log("============== 내 휴가 신청 내역 ============== ", res.data);

  return res.data;
};

// 휴가 조회(휴가 번호)
export const getMemberVacation = async (vacId) => {
  const res = await axios.get(`${API_SERVER_HOST}/vacation/${vacId}`);

  console.log("============== 휴가 조회(휴가 번호) ============== ", res.data);

  return res.data;
};

// 휴가수정
export const updateVacation = async (vacId, vacation) => {
  const res = await jwtAxios.put(
    `${API_SERVER_HOST}/vacation/${vacId}`,
    vacation
  );
  console.log("============== 휴가 수정 ============== ", res.data);

  return res.data;
};

// 휴가삭제
export const deleteVacation = async (vacId) => {
  const res = await jwtAxios.delete(`${API_SERVER_HOST}/vacation/${vacId}`);
  console.log("============== 휴가 삭제 ============== ", res.data);

  return res.data;
};

// 휴가 승인 거절 대기 별 리스트 출력
export const getMemberVacationStatus = async (pageParam) => {
  const { page, size, filter } = pageParam;
  const res = await jwtAxios.get(`${API_SERVER_HOST}/vacation/status`, {
    params: { page: page, size: size, status: filter },
  });
  console.log(
    "============== 휴가 승인 거절 대기 별 리스트 출력  ============== ",
    res.data
  );

  return res.data;
};
