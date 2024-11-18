import React, { useEffect, useState } from "react";
import styles from "./UpdateVacation.module.css";
import { deleteVacation, getMemberVacation, updateVacation } from "../../api/vacationApi";
import { useNavigate, useParams } from "react-router-dom";
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

const UpdateVacationComponent = () => {
  const { vacId } = useParams();
  const [vacation, setVacation] = useState(initState);
  const { moveToRead } = useCustomMove();

 const handleClickModify = () => {

  
  updateVacation(vacId,vacation).then((data)=>{
    
    console.log(data)
    alert("수정되었습니다.");
    moveToRead(vacId)
  })

}

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteVacation(vacId).then((data) => {
        console.log(data);
      });
    }
  };

  const handleChange = (e) => {
    setVacation({ ...vacation, [e.target.name]: e.target.value });
    console.log(vacation);
  };

    useEffect(() => {
    getMemberVacation(vacId).then((data) => {
      setVacation(data); // data를 사용하여 vacation 상태를 업데이트
      console.log(data);
    });
  }, [vacId]);

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

      {isEditable && (
        <div className={styles.bottomButtonGroup}>
          <button
            className={`${styles.button} ${styles.editButton}`}
            onClick={()=>handleClickModify(vacId,vacation)}
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
