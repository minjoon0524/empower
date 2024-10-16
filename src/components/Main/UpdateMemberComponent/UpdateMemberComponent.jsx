import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { modifyMember, getMember } from "../../../api/memberApi";
import styles from "./UpdateMemberComponent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCalendarDays,
  faEnvelope,
  faLocationDot,
  faPhone,
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";

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

const UpdateMemberComponent = ({ eid }) => {
  const navigate = useNavigate();
  const [member, setMember] = useState(initState);
  const [result, setResult] = useState("");
  const loginInfo = useSelector((state) => state.loginSlice);

  useEffect(() => {
    getMember(eid).then((data) => {
      setMember(data);
    });
  }, [eid]);

  const handleChange = (e) => {
    member[e.target.name] = e.target.value;
    setMember({ ...member });
    console.log(member);
  };

  const handleModify = () => {
    modifyMember(member).then((result) => {
      setResult("수정되었습니다.");
      alert("수정되었습니다.");
      // 수정 후 필요한 작업 (예: 다른 페이지로 이동)
      // navigate("/memberdetail");
    });
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
                <img
                  src="https://static.nid.naver.com/images/web/user/default.png"
                  width="56"
                  height="56"
                  alt="프로필 이미지"
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
    </div>
  );
};

export default UpdateMemberComponent;
