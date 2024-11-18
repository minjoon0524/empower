import React, { useEffect, useState } from "react";
import styles from "./MyVacationDetailComponent.module.css";
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

const MyVacationDetailComponent = ({ vacId }) => {
  const [vacation, setVacation] = useState(initState);
  const navigate=useNavigate()
  const {moveToModify}=useCustomMove()
  useEffect(() => {
    getMemberVacation(vacId).then((data) => {
      console.log(data);
      setVacation(data);
    }).catch((error) => {
      console.error("휴가 호출 에러:", error);
    });
  }, [vacId]);

  const getVacTypeKorean = (type) => {
    const types = {
      GENERAL: "연차",
      SICK: "병가",
      SPECIAL: "특별휴가",
    };
    return types[type] || type;
  };

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
      // TODO: 삭제 API 호출
      deleteVacation(vacId).then((data) => {
        console.log(data);
      });
    }
  };

  // PENDING 상태일 때만 수정/삭제 가능
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
          <div className={styles.value}>
            {getVacTypeKorean(vacation.vacType)}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>승인 상태</div>
          <div className={styles.value}>
            {getVacStatusKorean(vacation.vacStatus)}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>시작일</div>
          <div className={styles.value}>{vacation.vacStartDate}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>종료일</div>
          <div className={styles.value}>{vacation.vacEndDate}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>사유</div>
          <div className={styles.value}>{vacation.vacDescription}</div>
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
            onClick={()=>moveToModify(vacId)}
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

export default MyVacationDetailComponent;
