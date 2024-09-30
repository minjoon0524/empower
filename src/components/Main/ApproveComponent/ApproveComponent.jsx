import React, { useEffect, useState } from "react";
import style from "./Approve.style.css";
import useCustomLogin from './../../../hooks/useCustomLogin';
import { getMemberList } from "../../../api/memberApi";
import useCustomMove from "../../../hooks/useCustomMove";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ApproveComponent = () => {
  const { page, size,refresh,moveToList,moveToRead } = useCustomMove();

  const [serverData, setServerData] = useState(initState);


  useEffect(() => {
    getMemberList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size,refresh]);

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
      {serverData.dtoList.map((member) => (
          <tr key={member.eid}>
            <td>{member.name}</td>
            <td>{member.department}</td>
            <td>{member.position}</td>
            <td>{member.email}</td>
            <td>{member.phone}</td>
            <td>{member.memberCheck ? "승인" : "미승인"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApproveComponent;
