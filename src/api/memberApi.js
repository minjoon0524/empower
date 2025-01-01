import axios from "axios";
import jwtAxios from "./../util/jwtUtil";

const API_SERVER_HOST = `http://localhost:80`;

const host = `${API_SERVER_HOST}`;

export const loginPost = async (loginParam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };

  const form = new FormData();
  form.append("username", loginParam.employeeNumber);
  form.append("password", loginParam.pw);

  const res = await axios.post(`${host}/login`, form, header);
  console.log("---------------------------- 데이터 확인");
  console.log(res.data);
  return res.data;
};

// 회원가입 된 MemberList를 가져오기 위한 API
export const getMemberList = async (pageParam) => {
  const { page, size, searchTerm, searchField } = pageParam;

  try {
    const res = await jwtAxios.get(`${API_SERVER_HOST}/member/list`, {
      params: { page, size, term: searchTerm, option: searchField },
    });

    return res.data;
  } catch (error) {
    console.error("멤버 목록 API 오류:", error);
    throw error; // 오류를 다시 던져서 호출하는 곳에서 처리
  }
};

// 사원 추가를 위한 함수
export const addMember = async (member) => {
  const res = await jwtAxios.post(`${API_SERVER_HOST}/member/register`, member);
  console.log("addMember 함수 테스트 .... ", res.data);
  return res.data;
};

//eid를 통해 member를 읽어오는 함수
export const getMember = async (eid) => {
  const res = await jwtAxios.get(`${API_SERVER_HOST}/member/${eid}`);
  console.log("getMember 함수 테스트 .... ", res.data);
  return res.data;
};

export const getProfilePhoto = async (fileName) => {
  const res = await jwtAxios.get(`${API_SERVER_HOST}/member/${fileName}`);
  console.log("getProfilePhoto 함수 테스트 .... ", res.data);
  return res.data;
};


export const modifyMember = async (eid, memberData, profileImage) => {
  console.log("회원 수정 테스트");
  
  const formData = new FormData();
  
  // memberData를 JSON 문자열로 변환하여 FormData에 추가
  formData.append("memberModifyDTO", new Blob([JSON.stringify(memberData)], { type: "application/json" }));

  // 프로필 이미지가 있으면 추가
  if (profileImage) {
    formData.append('profileName', profileImage);
  }
  
  const res = await axios.put(`${API_SERVER_HOST}/member/modify/${eid}`, formData);
  return res.data;
};


export const deleteMember = async (eid) => {
  console.log("회원 삭제 테스트");
  const res = await jwtAxios.delete(`${API_SERVER_HOST}/member/${eid}`);
  return res.data;
};

//회원 권한 부여
export const grantMember = async (eid) => {
  console.log("회원 권한 테스트");
  const res = await jwtAxios.post(`${API_SERVER_HOST}/member/grant/${eid}`);
  return res.data;
};

// 프로필 사진 가져오는 함수 

//{eid}