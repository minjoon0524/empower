import React from "react";
import style from "./Approve.style.css";
import useCustomLogin from './../../../hooks/useCustomLogin';

const ApproveComponent = () => {
  // 로그인한 User확인을 위한 State
  const {loginState}=useCustomLogin();
  console.log(loginState)
  return (
    
    <table>
    <thead>
      <tr>
        <th>이름</th>
        <th>부서</th>
        <th>직급</th>
        <th>이메일</th>
        <th>전화번호</th>
        <th>가입승인</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{loginState.name}</td>
        <td>{loginState.department}</td>
        <td>{loginState.position}</td>
        <td>{loginState.eid}</td>
        <td>{loginState.phone}</td>
        <td>{loginState.memberCheck}</td>
      </tr>

    </tbody>
  </table>
);
};

export default ApproveComponent;
