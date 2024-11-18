import React from "react";
import styles from "./Attendance.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PersonalAttendanceTable = ({ member,memberList }) => {
  const getStatusText = (status) => {
    switch (status) {
      case "CHECKED_IN":
        return "출근";
      case "CHECKED_OUT":
        return "퇴근";
      case "LATE":
        return "지각";
      case "ABSENT":
        return "결근";
      default:
        return "미등록";
    }
  };

  const groupByYearMonth = (attendanceData) => {
    console.log(attendanceData)
    return attendanceData.reduce((acc, curr) => {
      const date = new Date(curr.checkInTime);
      const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!acc[yearMonth]) {
        acc[yearMonth] = [];
      }
      acc[yearMonth].push(curr);
  
      return acc;
    }, {});
  };

  const groupedData = groupByYearMonth(memberList);

  return (
    <div className={styles.memberCard}>
      {Object.keys(groupedData)
        .filter((yearMonth) => yearMonth.endsWith('-11'))
        .map((yearMonth) => (
          <div key={yearMonth}>
            <div className={styles.cal_area}>
              <FontAwesomeIcon icon={faArrowLeft} />
              <h3 className={styles.cal}>{yearMonth}</h3>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            
            <table className={styles.memberTable}>
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
                {groupedData[yearMonth].map((memberData, index) => (
                  <tr key={memberData.eid}>
                    <td>{index + 1}</td>
                    <td>{memberData.eid}</td>
                    <td>{memberData.name}</td>
                    <td>{memberData.department}</td>
                    <td>{memberData.checkInTime}</td>
                    <td>{memberData.checkOutTime}</td>
                    <td>{getStatusText(memberData.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};

export default PersonalAttendanceTable;
