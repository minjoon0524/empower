import React, { useEffect, useState } from "react";
import {deleteMember, getMember} from "../../../api/memberApi";
import styles from "./MemberReadComponent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCalendarDays,
  faEnvelope,
  faLocationDot,
  faPhone,
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import useCustomMove from "../../../hooks/useCustomMove";

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

  const navigate = useNavigate();
  const {moveToList}=useCustomMove()

  const goToModify = () => {
    navigate(`/member/modify/${member.eid}`);
  };

  const handleClickDelete = () => { //버튼 클릭시

    deleteMember(eid).then( data => {
      console.log("delete result: " + data)
      moveToList()
    })
    alert("삭제되었습니다.");


  }

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
                  src="https://static.nid.naver.com/images/web/user/default.png"
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
                <FontAwesomeIcon
                  className={styles.icon}
                  v
                  icon={faRankingStar}
                />
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
                {" "}
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
        <button className={styles.btn_edit} onClick={handleClickDelete}>회원 삭제</button>
      </div>
    </div>
  );
};

export default MemberReadComponent;
