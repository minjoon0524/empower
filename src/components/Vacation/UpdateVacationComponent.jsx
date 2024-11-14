import React, { useEffect, useState } from "react";
import styles from "./UpdateVacation.module.css";
import { deleteVacation, getMemberVacation } from "../../api/vacationApi";
import { useNavigate } from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  eid: "",
  memberName: "",
  department: "",
  position: "",
  vacType: "",
  vacStatus: "",
  vacStartDate: "",
  vacEndDate: "",
  vacDescription: "",
  regTime: "",
};

const UpdateVacationComponent = ({ vacId }) => {
  const [vacation, setVacation] = useState(initState);
  const { moveToModify } = useCustomMove();

  // useEffect(() => {
  //   getMemberVacation(vacId).then((data) => {
  //     console.log("===== 휴가 수정 테스트 진행 ====")
  //     setVacation(data);
  //   });
  // }, [vacId]);

  const getVacStatusKorean = (status) => {
    const statuses = {
      APPROVE: "승인",
      PENDING: "대기중",
      REJECT: "거절",
    };
    return statuses[status] || status;
  };

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteVacation(vacId).then((data) => {
        console.log(data);
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setVacation((prev) => ({ ...prev, [name]: value }));
  };

  const isEditable = vacation.vacStatus === "PENDING";

  return (
    <div className={styles.container}>
      {/* Form Grid */}
      <div className={styles.formGrid}>
        <h3 className={styles.sectionTitle}>사원 정보</h3>

        <div className={styles.row}>
          <div className={styles.label}>사원 ID</div>
          <div className={styles.value}>{vacation.eid}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>이름</div>
          <div className={styles.value}>{vacation.memberName}</div>
        </div>

        <h3 className={styles.sectionTitle}>휴가 정보</h3>

        <div className={styles.row}>
          <div className={styles.label}>휴가 유형</div>
          <select
            name="vacType"
            value={vacation.vacType}
            onChange={handleChange}
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



        <div className={styles.row}>
          <div className={styles.label}>시작일</div>
          <input
            type="date"
            name="vacStartDate"
            value={vacation.vacStartDate}
            onChange={handleChange}
            className={styles.value}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.label}>종료일</div>
          <input
            type="date"
            name="vacEndDate"
            value={vacation.vacEndDate}
            onChange={handleChange}
            className={styles.value}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.label}>사유</div>
          <textarea
            name="vacDescription"
            value={vacation.vacDescription}
            onChange={handleChange}
            className={styles.value}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.label}>신청일시</div>
          <div className={styles.value}>{vacation.regTime}</div>
        </div>
      </div>

      {/* 버튼 그룹을 맨 아래에 배치 */}
      {isEditable && (
        <div className={styles.bottomButtonGroup}>
          <button
            className={`${styles.button} ${styles.editButton}`}
            onClick={moveToModify(vacId)}
          >
            수정
          </button>
          <button
            className={`${styles.button} ${styles.deleteButton}`}
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateVacationComponent;
