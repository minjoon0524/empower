import React, { useEffect, useState } from "react";
import styles from "./UpdateVacation.module.css";
import { deleteVacation, getMemberVacation, updateVacation } from "../../api/vacationApi";
import { useNavigate, useParams } from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove";
import ConfirmationModal from "../../modal/ConfirmationModal";

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
  const { moveToRead,moveToVacationList } = useCustomMove();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleClickModify = () => {
    setModalType("modify");
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    setModalType("delete");
    setIsModalOpen(true);
  };

  const confirmAction = () => {
    if (modalType === "delete") {
      deleteVacation(vacId).then((data) => {
        console.log(data);
        setIsModalOpen(false);
        moveToVacationList()
      });
    } else if (modalType === "modify") {
      updateVacation(vacId, vacation).then((data) => {
        console.log(data);
        setSuccessMessage("수정되었습니다.");
        setIsModalOpen(false);
        moveToRead(vacId)
      });
    }
  };

  const handleChange = (e) => {
    setVacation({ ...vacation, [e.target.name]: e.target.value });
    console.log(vacation);
  };

  useEffect(() => {
    getMemberVacation(vacId).then((data) => {
      setVacation(data);
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
            onClick={handleClickModify}
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

      <ConfirmationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmAction}
        title={modalType === "delete" ? "삭제 확인" : "수정 확인"}
        message={modalType === "delete" ? "정말로 삭제하시겠습니까?" : "수정을 진행하시겠습니까?"}
      />

      <ConfirmationModal
        open={!!successMessage}
        onClose={() => setSuccessMessage("")}
        title="수정 완료"
        message={successMessage}
      />
    </div>
  );
};

export default UpdateVacationComponent;
