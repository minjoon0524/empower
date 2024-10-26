import React, { useState } from "react";
import style from "./JoinComponent.module.css";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { addMember } from "../../api/memberApi";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  eid: "",
  pw: "",
  name: "",
  department: "",
  position: "",
  email: "",
};

const JoinComponent = ({ isOpen, onRequestClose }) => {
  const [member, setMember] = useState(initState);

  const {moveToModify}=useCustomMove()

  const handleInputChange = (e) => {
    member[e.target.name] = e.target.value
    setMember({...member})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember(member).then(data=>{
      console.log("addMember Result : ",data)
    })
    onRequestClose();
    // moveToModify();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={style.modalContent}
      overlayClassName={style.modalOverlay}
    >
      <div className={style.container}>
        <div className={style.contents}>
          <div className={style.close_btn}>
            <FontAwesomeIcon onClick={onRequestClose} icon={faX} />
          </div>
          <div className={style.contents_box}>
            {/* 첫번째 */}
            <div className={style.logo}>
              <h1>EMPOWER</h1>
              <h2 className={style.title}>새로운 사원을 추가합니다.</h2>
            </div>

            {/* 두번째 */}
            <div className={style.logo}>
              <form onSubmit={handleSubmit}>

              <div className={style.input_cover}>
                  <input
                    className={style.input}
                    name="name"
                    placeholder="이름"
                    value={member.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={style.input_cover}>
                  <input
                    type="text"
                    name="eid"
                    className={style.input}
                    placeholder="사번"
                    value={member.employeeNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={style.input_cover}>
                  <input
                    className={style.input}
                    type="password"
                    name="pw"
                    placeholder="비밀번호"
                    value={member.pw}
                    onChange={handleInputChange}
                  />
                </div>
     
                <div className={style.input_cover}>
                  <select
                    className={style.input}
                    name="department"
                    value={member.department}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      부서
                    </option>
                    <option value="개발팀">개발팀</option>
                    <option value="QA팀">QA팀</option>
                    <option value="운영팀">운영팀</option>
                    <option value="기술 지원팀">기술 지원팀</option>
                    <option value="프로젝트 관리팀">프로젝트 관리팀</option>
                    <option value="UX/UI 디자인팀">UX/UI 디자인팀</option>
                    <option value="데이터 분석팀">데이터 분석팀</option>
                    <option value="보안팀">보안팀</option>
                    <option value="인프라팀">인프라팀</option>
                    <option value="마케팅팀">마케팅팀</option>
                  </select>
                </div>

                <div className={style.input_cover}>
                  <select
                    className={style.input}
                    name="position"
                    value={member.position}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      직급
                    </option>
                    <option value="사원">사원</option>
                    <option value="주임">주임</option>
                    <option value="대리">대리</option>
                    <option value="과장">과장</option>
                    <option value="차장">차장</option>
                    <option value="부장">부장</option>
                    <option value="이사">이사</option>
                  </select>
                </div>
                <div className={style.input_cover}>
                  <input
                    type="email"
                    className={style.input}
                    name="email"
                    placeholder="이메일"
                    value={member.email}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className={style.btn_submit}>
                  사원 추가
                </button>
              </form>
              {/* <button className={style.btn_close} onClick={onRequestClose}>닫기</button> */}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default JoinComponent;
