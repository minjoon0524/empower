import React, { lazy, useState } from "react";
import styles from "./vacation.module.css";
import useCustomLogin from "../../hooks/useCustomLogin";
import { registerVacation } from "../../api/vacationApi";
import ToastModal from './../../modal/ToastModal';
import useCustomMove from "../../hooks/useCustomMove";
const Loader = lazy(() => import("../Loader/Loader"));


const initState = {
  eid: "",
  vacType: "", // 휴가 유형
  vacStartDate: "", // 시작일
  vacEndDate: "", // 종료일
  vacDescription: "", // 사유
};

function VacationFormComponent() {
  
  const { loginState } = useCustomLogin();
  const {moveToMyVacationList}=useCustomMove()
  const [serverData, setServerData] = useState(initState);
  const [reason, setReason] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [isToastVisible, setIsToastVisible] = useState(false); // ToastModal 가시성 상태 추가
  const [toastMessage, setToastMessage] = useState(""); // Toast 메시지 상태 추가

  const handleChangeVacation = (e) => {
    serverData.vacType="GENERAL"
    serverData[e.target.name] = e.target.value;
    serverData.eid = loginState.eid;
    setServerData({ ...serverData });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setServerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // 날짜 범위 계산
    if (name === "vacStartDate" || name === "vacEndDate") {
      const startDate = new Date(serverData.vacStartDate);
      const endDate = new Date(value);
      const timeDifference = endDate - startDate;
      const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
      setTotalDays(dayDifference >= 0 ? dayDifference + 1 : 0);
    }
  };

  const showToast = (message) => {
    setToastMessage(message); // 메시지를 설정
    setIsToastVisible(true); // 토스트 표시
    setLoading(false); // 로딩 종료

    // 3초 후 자동으로 닫기
    setTimeout(() => {
        setIsToastVisible(false);
    }, 3000);
  };

  const handleClickAdd = (e) => {
    e.preventDefault();
    if (
      !serverData.vacStartDate ||
      !serverData.vacEndDate ||
      !serverData.vacDescription ||
      !serverData.vacType
    ) {
      setLoading(false); // 에러 발생 시 로딩 종료
      showToast("모든 필드를 채워주세요."); // 오류 메시지 설정
      return;
    }
    setLoading(true); // 로딩 시작
    registerVacation(serverData).then((data) => {
      setLoading(false); // 로딩 종료
      console.log(data);
      showToast("휴가 신청이 완료되었습니다."); // 성공 메시지 설정
      setTimeout(() => {
        moveToMyVacationList();
      }, 1000); // 3초 후 이동
    }).catch(() => {
      setLoading(false); // 에러 발생 시 로딩 종료
      showToast("휴가 신청 중 오류가 발생했습니다."); // 오류 메시지 설정
    });
  };

  return (
    <div className={styles.container}>
      {loading && Loader} {/* 로딩 상태에 따라 로딩 컴포넌트 표시 */}
      <form className={styles.form}>
        {/* 휴가 종류 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>휴가 종류</label>
          <select
            name="vacType"
            value={serverData.vacType}
            onChange={handleChangeVacation}
            className={styles.select}
          >
            <option value="GENERAL">일반</option>
            <option value="HALF_DAY">반차</option>
            <option value="SICK_LEAVE">병가</option>
            <option value="CONDOLENCE_SPOUSE">조사(배우자)</option>
            <option value="CONDOLENCE_SIBLING">조사(형제)</option>
            <option value="MILITARY_SERVICE">예비군</option>
          </select>
        </div>

        {/* 휴가 기간 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>휴가 기간</label>
          <div className={styles.dateRange}>
            <input
              type="date"
              name="vacStartDate"
              value={serverData.vacStartDate}
              onChange={handleDateChange}
              className={styles.dateInput}
            />
            <span className={styles.dateSeparator}>-</span>
            <input
              type="date"
              name="vacEndDate"
              value={serverData.vacEndDate}
              onChange={handleDateChange}
              className={styles.dateInput}
            />
            <span className={styles.dateTotal}>총 {totalDays}일 선택</span>
          </div>
        </div>

        {/* 사유 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>사유</label>
          <input
            type="text"
            name="vacDescription"
            value={serverData.vacDescription}
            onChange={handleChangeVacation}
            className={styles.input}
            placeholder="사유를 작성해주세요."
          />
        </div>

        {/* 증빙서 첨부 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>증빙서 첨부</label>
          <input
            type="file"
            onChange={(e) => setReason(e.target.files[0])}
            className={`${styles.input} ${styles.inputFile}`} // 커스텀 스타일 추가
          />
        </div>

        {/* 제출 버튼 */}
        <button onClick={handleClickAdd} className={styles.submitButton}>
          휴가 신청
        </button>
      </form>
      <ToastModal isToastVisible={isToastVisible} setIsToastVisible={setIsToastVisible} toastMessage={toastMessage} /> {/* ToastModal 추가 */}
    </div>
  );
}

export default VacationFormComponent;
