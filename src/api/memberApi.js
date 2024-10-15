import axios from "axios";
import jwtAxios from "./../util/jwtUtil";
import { useState } from "react";
import { getCookie } from "../util/CookieUtil";

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

//eid를 통해 member를 읽어오는 함수
export const getMember = async (eid) => {
  const res = await jwtAxios.get(`${API_SERVER_HOST}/member/${eid}`);
  console.log("getMember 함수 테스트 .... ", res.data);
  return res.data;
};

export const modifyMember = async (member) => {
  console.log("회원 수정 테스트")
  console.log(member)
  const res = await axios.put(`${API_SERVER_HOST}/member/modify`, member);
  return res.data
};

export const deleteMember = async (eid) => {
  console.log("회원 삭제 테스트")
  const res = await jwtAxios.delete(`${API_SERVER_HOST}/member/${eid}`);
  return res.data;
};