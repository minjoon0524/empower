import React, { useEffect, useState } from "react";
import styles from "./Attendance.module.css";
import useCustomLogin from "../../hooks/useCustomLogin";
import {
  checkIn,
  checkOut,
  getOneMemberAttendance,
} from "../../api/attendanceApi";
import PersonalAttendanceTable from "./PersonalAttendanceTable";
import Modal from "@mui/material/Modal";

const initState = {
  eid: "",
  name: "",
  department: "",
  checkInTime: "",
  checkOutTime: "",
  status: "",
};

const ConfirmationModal = ({ open, onClose, onConfirm, title, message }) => (
  <Modal open={open} onClose={onClose} className={styles.modal}>
    <div className={styles.modalContent}>
      <h2>{title}</h2>
      <p>{message}</p>
      <div className={styles.modalButtonArea}>
        <button onClick={onConfirm} className={styles.modalButtonConfirm}>
          확인
        </button>
        <button onClick={onClose} className={styles.modalButtonCancel}>
          취소
        </button>
      </div>
    </div>
  </Modal>
);

const MemberAttendanceComponent = () => {
  const { loginState } = useCustomLogin();
  const [member, setMember] = useState(initState);
  const [memberList,setMemberList]=useState([]);
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  const eid = loginState.eid;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    getOneMemberAttendance(loginState.eid)
      .then((data) => {
        if (data.dtoList && data.dtoList.length > 0) {
          console.log(data.dtoList)
          const fetchedMember = data.dtoList[0];
          
          const checkOutDate = new Date(fetchedMember.checkOutTime);

          setMemberList(data.dtoList);

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
    setModalAction('checkIn');
    setIsModalOpen(true);
  };

  const leaveWorkClick = () => {
    setModalAction('checkOut');
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (modalAction === 'checkIn') {
      checkIn(eid)
        .then(() => {
          return getOneMemberAttendance(eid);
        })
        .then((data) => {
          if (data.dtoList && data.dtoList.length > 0) {
            const updatedMember = data.dtoList[0];
            setMember(updatedMember);
            setMemberList((prevList) => [...prevList, updatedMember]);
            setAlertMessage("정상출근되었습니다.");
          } else {
            setMember(initState);
          }
        })
        .catch((error) => {
          console.error("출근 정보 불러오기 오류:", error);
          setAlertMessage(error.response.data);
        });
    } else if (modalAction === 'checkOut') {
      checkOut(eid)
        .then(() => {
          return getOneMemberAttendance(eid);
        })
        .then((data) => {
          if (data.dtoList && data.dtoList.length > 0) {
            const updatedMember = data.dtoList[0];
            setMember(updatedMember);
            setMemberList((prevList) => {
              return prevList.map(member => 
                member.eid === updatedMember.eid ? updatedMember : member
              );
            });
            setAlertMessage("정상퇴근되었습니다.");
          } else {
            setMember(initState);
          }
        })
        .catch((error) => {
          setAlertMessage(error.response.data);
        });
    }
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
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

      <PersonalAttendanceTable member={member} memberList={memberList}/>

      <ConfirmationModal 
        open={isModalOpen} 
        onClose={handleClose} 
        onConfirm={handleConfirm} 
        title={modalAction === 'checkIn' ? "출근 확인" : "퇴근 확인"} 
        message={modalAction === 'checkIn' ? "출근하시겠습니까?" : "퇴근하시겠습니까?"} 
      />
      {alertMessage && <ConfirmationModal open={!!alertMessage} onClose={() => setAlertMessage("")} onConfirm={() => setAlertMessage("")} title="알림" message={alertMessage} />}
    </div>


  );
};

export default MemberAttendanceComponent;
