import React, { useState } from "react";
import styles from "./vacation.module.css";
import useCustomLogin from "../../hooks/useCustomLogin";
import { registerVacation } from "../../api/vacationApi";

// const initState = {
//   member: {},
//   eid: "", // 사원 ID
//   memberName: "", // 추가
//   department: "", // 추가
//   position: "", // 추가
//   vacType: "", // 휴가 유형
//   vacStatus: "", // 승인 상태
//   vacStartDate: "", // 시작일
//   vacEndDate: "", // 종료일
//   vacDescription: "", // 사유
// };
const initState = {
  eid: "",
  vacType: "", // 휴가 유형
  vacStartDate: "", // 시작일
  vacEndDate: "", // 종료일
  vacDescription: "", // 사유
};

function VacationFormComponent() {
  const { loginState } = useCustomLogin();
  const [serverData, setServerData] = useState(initState);
  const [reason, setReason] = useState("");
  const [totalDays, setTotalDays] = useState(0);

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

  const handleClickAdd = (e) => {
    e.preventDefault();
    if (
      !serverData.vacStartDate ||
      !serverData.vacEndDate ||
      !serverData.vacDescription ||
      !serverData.vacType
    ) {
      alert("모든 필드를 채워주세요.");
      return;
    }
    registerVacation(serverData).then((data) => {
      console.log(data);
      // 추가 로직 (예: 성공 메시지 표시, 폼 초기화 등)
    });
  };

  return (
    <div className={styles.container}>
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
            <span className={styles.dateSeparator}>~</span>
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
            className={styles.input}
          />
        </div>

        {/* 제출 버튼 */}
        <button onClick={handleClickAdd} className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default VacationFormComponent;
