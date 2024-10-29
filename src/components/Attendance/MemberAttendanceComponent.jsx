import React, { useEffect, useState } from "react";
import styles from "./Attendance.module.css";
import useCustomLogin from "../../hooks/useCustomLogin";
import {
  checkIn,
  checkOut,
  getOneMemberAttendance,
} from "../../api/attendanceApi";

const initState = {
  eid: "",
  name: "",
  department: "",
  checkInTime: "",
  checkOutTime: "",
  status: "",
};

const MemberAttendanceComponent = () => {
  const { loginState } = useCustomLogin();
  const [member, setMember] = useState(initState);
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  const eid = loginState.eid;

  useEffect(() => {
    getOneMemberAttendance(loginState.eid)
      .then((data) => {
        if (data.dtoList && data.dtoList.length > 0) {
          const fetchedMember = data.dtoList[0];
          const checkOutDate = new Date(fetchedMember.checkOutTime);

          // 현재 날짜와 checkOutTime의 날짜 비교
          if (today.toDateString() !== checkOutDate.toDateString()) {
            // 날짜가 다르면 checkInTime과 checkOutTime 초기화
            setMember({
              ...fetchedMember,
              checkInTime: "",
              checkOutTime: "",
            });
          } else {
            // 날짜가 같으면 기존 데이터를 사용
            setMember(fetchedMember);
          }
        }
      })
      .catch((error) => {
        console.error("출근 정보 불러오기 오류:", error);
        alert("출근 정보를 불러오는 중 오류가 발생했습니다.");
      });
  }, [loginState.eid]);

  useEffect(() => {
    console.log(member);
  }, [member]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const goWorkClick = () => {
    checkIn(eid)
      .then(() => {
        return getOneMemberAttendance(eid);
      })
      .then((data) => {
        if (data.dtoList && data.dtoList.length > 0) {
          setMember(data.dtoList[0]);
          alert("정상출근되었습니다.");
        } else {
          setMember(initState);
        }
      })
      .catch((error) => {
        console.error("출근 정보 불러오기 오류:", error);
        alert(error.response.data);
      });
  };

  const leaveWorkClick = () => {
    checkOut(eid)
      .then(() => {
        return getOneMemberAttendance(eid);
      })
      .then((data) => {
        if (data.dtoList && data.dtoList.length > 0) {
          setMember(data.dtoList[0]);
          alert("정상퇴근되었습니다.");
        } else {
          setMember(initState);
        }
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  return (
    <div>
      <div className={styles.memberCard}>
        <div className={styles.time_info}>
          <div className={styles.current_data}>{formattedDate}</div>
          <div className={styles.current_time}>{currentTime}</div>
          <div className={styles.check_in_time} style={{ marginTop: "10px" }}>
            출근 시간 : {member.checkInTime ? member.checkInTime : "미등록"}
          </div>
          <div className={styles.check_out_time}>
            퇴근 시간 : {member.checkOutTime ? member.checkOutTime : "미등록"}
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.time_btn}>
          <button onClick={goWorkClick} className={styles.btn_submit}>
            출근
          </button>
          <button onClick={leaveWorkClick} className={styles.btn_submit} style={{ marginTop: "20px" }}>
            퇴근
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberAttendanceComponent;
