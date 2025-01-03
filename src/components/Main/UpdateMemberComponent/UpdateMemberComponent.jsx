import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { modifyMember, getMember } from "../../../api/memberApi";
import styles from "./UpdateMemberComponent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useCustomMove from "../../../hooks/useCustomMove";
import {
  faBuilding,
  faCalendarDays,
  faEnvelope,
  faLocationDot,
  faPhone,
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";
import AlertModal from '../../../modal/AlertModal';

const initState = {
  eid: "",
  name: "",
  department: "",
  email: "",
  phone: "",
  address: "",
  position: "",
  hireDate: "",
  profileName: ""
};

const UpdateMemberComponent = ({ eid }) => {
  const navigate = useNavigate();
  const [member, setMember] = useState(initState);
  const [result, setResult] = useState("");
  const loginInfo = useSelector((state) => state.loginSlice);
  const { moveToList } = useCustomMove();
  const [imagePreview, setImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const uploadRef = useRef();

  useEffect(() => {
    getMember(eid).then((data) => {
      setMember(data);
    });
  }, [eid]);

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleModify = () => {
    const file = uploadRef.current.files[0]; // 선택된 파일 가져오기
    modifyMember(member.eid, member, file).then((result) => {
      setResult("수정되었습니다.");
      setIsModalOpen(true); // 모달 열기
      setTimeout(() => { // 일정 시간 후에 이동
        moveToList();
      }, 2000); // 2초 후에 이동
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={styles.memberCard}>
        <div className={styles.myprofile}>
          <div className={styles.info_title}>
            <h3 className={styles.title_text}>회원 정보 수정</h3>
          </div>
          <ul className={styles.myinfo_area}>
            <li>
              <div className={styles.myphoto}>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    width="56"
                    height="56"
                    alt="미리보기 이미지"
                  />
                ) : (
                  <img
                    src={`http://localhost/member/profile/${member.profileImagePath}`}
                    width="56"
                    height="56"
                    alt="프로필 이미지"
                  />
                )}
                <input
                  type={"file"}
                  ref={uploadRef}
                  onChange={handleImageChange}
                  className={styles.imageInput}
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

      <div className={styles.subindex_box}>
        <ul className={styles.subindex_row}>
          <li>
            <div className={`${styles.row_item} ${styles.bottom_line}`}>
              <span className={styles.item_text}>
                <FontAwesomeIcon className={styles.icon} icon={faBuilding} />
                부서 :{" "}
              </span>
              <input
                className={styles.item_text}
                name="department"
                value={member.department}
                onChange={handleChange}
              />
            </div>
          </li>
          <li>
            <div className={`${styles.row_item} ${styles.bottom_line}`}>
              <span className={styles.item_text}>
                <FontAwesomeIcon className={styles.icon} icon={faRankingStar} />
                직위 :{" "}
              </span>
              <input
                className={styles.item_text}
                name="position"
                value={member.position}
                onChange={handleChange}
              />
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
              <input
                className={styles.item_text}
                name="hireDate"
                value={member.hireDate}
                onChange={handleChange}
                type="date"
              />
            </div>
          </li>
        </ul>
      </div>

      <div className={styles.subindex_box2}>
        <ul className={styles.subindex_row}>
          <li>
            <div className={`${styles.row_item} ${styles.bottom_line}`}>
              <span className={styles.item_text}>
                <FontAwesomeIcon className={styles.icon} icon={faPhone} />
                휴대전화 :{" "}
              </span>
              <input
                className={styles.item_text}
                name="phone"
                value={member.phone}
                onChange={handleChange}
              />
            </div>
          </li>
          <li>
            <div className={`${styles.row_item} ${styles.bottom_line}`}>
              <span className={styles.item_text}>
                <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
                이메일 :{" "}
              </span>
              <input
                className={styles.item_text}
                name="email"
                value={member.email}
                onChange={handleChange}
                type="email"
              />
            </div>
          </li>
          <li>
            <div className={`${styles.row_item} ${styles.bottom_line}`}>
              <span className={styles.item_text}>
                <FontAwesomeIcon className={styles.icon} icon={faLocationDot} />
                주소 :{" "}
              </span>
              <input
                className={styles.item_text}
                name="address"
                value={member.address}
                onChange={handleChange}
              />
            </div>
          </li>
        </ul>
      </div>

      <div className={styles.member_submit_btn_area}>
        <button className={styles.btn_edit} onClick={handleModify}>
          저장
        </button>
        <button className={styles.btn_edit} onClick={() => navigate(-1)}>
          취소
        </button>
      </div>

      {/* 수정 완료 모달 */}
      <AlertModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="수정 완료"
        message="수정되었습니다."
      />
    </div>
  );
};

export default UpdateMemberComponent;
