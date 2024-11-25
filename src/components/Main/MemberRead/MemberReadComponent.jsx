import React, { useEffect, useState } from "react";
import { deleteMember, getMember, getProfilePhoto } from "../../../api/memberApi";
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
import Modal from '@mui/material/Modal';

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

const MemberReadComponent = ({ eid }) => {
  const [member, setMember] = useState(initState);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const navigate = useNavigate();
  const { moveToList } = useCustomMove();

  const goToModify = () => {
    navigate(`/member/modify/${member.eid}`);
  };

  const handleClickDelete = () => { // 삭제 버튼 클릭 시
    setIsModalOpen(true); // 모달 열기
  };

  const confirmDelete = () => {
    deleteMember(eid).then(data => {
      console.log("delete result: " + data);
      moveToList();
    });
    setIsModalOpen(false); // 모달 닫기
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // 모달 닫기
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
                <FontAwesomeIcon className={styles.icon} icon={faCalendarDays} />
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
        <button onClick={goToModify} className={styles.btn_edit}>
          회원 수정
        </button>
        <button className={styles.btn_edit} onClick={handleClickDelete}>
          회원 삭제
        </button>
      </div>

      {/* 삭제 모달 */}
      <Modal
  open={isModalOpen}
  onClose={cancelDelete}
  className={styles.modal}
>
  <div className={styles.modalContent}>

    <h2>
      회원 삭제 확인
    </h2>
    <p>정말로 이 회원을 삭제하시겠습니까?</p>
    <div className={styles.modalButtonArea}>
      <button onClick={confirmDelete} className={styles.modalButtonConfirm}>
        삭제
      </button>
      <button onClick={cancelDelete} className={styles.modalButtonCancel}>
        취소
      </button>
    </div>
  </div>
</Modal>
    </div>
  );
};

export default MemberReadComponent;
