import React, { useEffect, useState } from "react";
import {
  deleteMember,
  getMember,
  getProfilePhoto,
  grantMember,
} from "../../../api/memberApi";
import styles from "./MemberReadComponent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCalendarDays,
  faEnvelope,
  faLocationDot,
  faPhone,
  faRankingStar,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useCustomMove from "../../../hooks/useCustomMove";
import Modal from "@mui/material/Modal";
import useCustomLogin from "../../../hooks/useCustomLogin";

const initState = {
  eid: "",
  name: "",
  department: "",
  email: "",
  phone: "",
  address: "",
  position: "",
  hireDate: "",
};

// 모달 컴포넌트 추가
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

const MemberReadComponent = ({ eid }) => {
  const [member, setMember] = useState(initState);
  const [modalType, setModalType] = useState(null); // 모달 타입 상태 추가
  const { loginState } = useCustomLogin();
  const navigate = useNavigate();
  const { moveToList } = useCustomMove();

  const goToModify = () => {
    navigate(`/member/modify/${member.eid}`);
  };

  const handleClickDelete = () => {
    setModalType("delete"); // 삭제 모달 열기
  };

  const handleClickGrant = () => {
    setModalType("grant"); // 권한 부여 모달 열기
  };

  const confirmDelete = () => {
    deleteMember(eid).then((data) => {
      console.log("delete result: " + data);
      moveToList();
    });
    setModalType(null); // 모달 닫기
  };

  const confirmGrant = () => {
    grantMember(eid).then((data) => {
      console.log("권한부여 결과 :", data);
      alert("권한부여완료");
    });
    setModalType(null); // 모달 닫기
  };

  useEffect(() => {
    getMember(eid).then((data) => {
      console.log(data);
      setMember(data);
    });
  }, [eid]);

  return (
    <div>
      <div className={styles.memberCard}>
        <div className={styles.myprofile}>
          <div className={styles.info_title}>
            <h3 className={styles.title_text}>기본정보</h3>
          </div>
          <ul className={styles.myinfo_area}>
            <li>
              <div className={styles.myphoto}>
                <img
                  src={`http://localhost/member/profile/${member.profileImagePath}`}
                  width="56"
                  height="56"
                  alt="내 프로필 이미지"
                />
              </div>
            </li>
            <li>
              <div className={styles.myaccount}>
                <div className={styles.myname}>
                  <div className={styles.name_text}>{member.name}</div>
                </div>
                <div className={styles.myaddress}>{member.eid}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* 부서 직위 */}
      <div className={styles.subindex_box}>
        <ul className={styles.subindex_row}>
          <li>
            <div className={`${styles.row_item} ${styles.bottom_line}`}>
              <span className={styles.item_text}>
                <FontAwesomeIcon className={styles.icon} icon={faBuilding} />
                부서 :{" "}
              </span>
              <span className={styles.item_text}>{member.department}</span>
            </div>
          </li>
          <li>
            <div className={`${styles.row_item} ${styles.bottom_line}`}>
              <span className={styles.item_text}>
                <FontAwesomeIcon className={styles.icon} icon={faRankingStar} />
                직위 :{" "}
              </span>
              <span className={styles.item_text}>{member.position}</span>
            </div>
          </li>
          <li>
            <div className={`${styles.row_item} ${styles.bottom_line}`}>
              <span className={styles.item_text}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faCalendarDays}
                />
                입사일 :{" "}
              </span>
              <span className={styles.item_text}>{member.hireDate}</span>
            </div>
          </li>
        </ul>
      </div>

      {/* 휴대전화 이메일 주소 */}
      <div className={styles.subindex_box2}>
        <ul className={styles.subindex_row}>
          <li>
            <div className={`${styles.row_item} ${styles.bottom_line}`}>
              <span className={styles.item_text}>
                <FontAwesomeIcon className={styles.icon} icon={faPhone} />
                휴대전화 :{" "}
              </span>
              <span className={styles.item_text}>{member.phone}</span>
            </div>
          </li>
          <li>
            <div className={`${styles.row_item} ${styles.bottom_line}`}>
              <span className={styles.item_text}>
                <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
                이메일 :{" "}
              </span>
              <span className={styles.item_text}>{member.email}</span>
            </div>
          </li>

          <li>
            <div className={`${styles.row_item} ${styles.bottom_line}`}>
              <span className={styles.item_text}>
                <FontAwesomeIcon className={styles.icon} icon={faLocationDot} />
                주소 :{" "}
              </span>
              <span className={styles.item_text}>{member.address}</span>
            </div>
          </li>
        </ul>
      </div>

      <div className={styles.member_submit_btn_area}>
        <div>
          {loginState?.roleNames[0] === "ADMIN" && (
            <button onClick={goToModify} className={styles.btn_edit}>
              회원 수정
            </button>
          )}
          {loginState?.roleNames[0] === "ADMIN" && (
            <button onClick={handleClickDelete} className={styles.btn_edit}>
              회원 삭제
            </button>
          )}
          {loginState?.roleNames[0] === "ADMIN" && (
            <button onClick={handleClickGrant} className={styles.btn_edit}>
              권한부여
            </button>
          )}
        </div>
      </div>

      {/* 모달 컴포넌트 사용 */}
      <ConfirmationModal
        open={modalType === "delete"}
        onClose={() => setModalType(null)}
        onConfirm={confirmDelete}
        title="회원 삭제 확인"
        message="정말로 이 회원을 삭제하시겠습니까?"
      />
      <ConfirmationModal
        open={modalType === "grant"}
        onClose={() => setModalType(null)}
        onConfirm={confirmGrant}
        title="권한 부여 확인"
        message="정말로 권한을 부여하시겠습니까?"
      />
    </div>
  );
};

export default MemberReadComponent;
