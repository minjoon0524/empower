import React, { useEffect, useState } from "react";
import styles from "./Attendance.module.css";
import { getOneMemberAttendance } from "../../api/attendanceApi";
import useCustomLogin from "../../hooks/useCustomLogin";

const PersonalAttendanceTable = () => {
  const { loginState } = useCustomLogin();
  const [member, setMember] = useState([]);
  const eid = loginState.eid;

  useEffect(() => {
    getOneMemberAttendance(eid).then((data) => {
      setMember(data.dtoList);  // data.dtoList가 배열일 경우 그대로 세팅
    });
  }, [eid]);

  return (
    <div className={styles.memberCard}>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="col-md-1">번호</th>
            <th className="col-md-2">직원 ID</th>
            <th className="col-md-2">이름</th>
            <th className="col-md-2">부서</th>
            <th className="col-md-2">출근 시간</th>
            <th className="col-md-2">퇴근 시간</th>
            <th className="col-md-1">상태</th>
          </tr>
        </thead>
        <tbody>
          {member.map((item, index) => (
            <tr key={item.employeeId}>
              <td>{index + 1}</td>
              <td>{item.eid}</td>
              <td>{item.name}</td>
              <td>{item.department}</td>
              <td>{item.checkInTime}</td>
              <td>{item.checkOutTime}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonalAttendanceTable;
