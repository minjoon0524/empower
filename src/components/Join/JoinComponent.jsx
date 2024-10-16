import React, { useState } from 'react'
import style from "./JoinComponent.module.css"
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const initState={
  employeeNumber: '',
  password: '',
  name: '',
  department: '',
  position: '',
  email: ''
}

const JoinComponent = ({ isOpen, onRequestClose }) => {
  const [employeeData, setEmployeeData] = useState(initState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 사원 추가 로직을 구현하세요
    console.log('사원 데이터:', employeeData);
    onRequestClose();
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
        <div><FontAwesomeIcon className={style.close_btn}  icon={faX} /></div>
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
                    type="text"
                    name="employeeNumber"
                    className={style.input}
                    placeholder="사번"
                    value={employeeData.employeeNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={style.input_cover}>
                  <input
                    className={style.input}
                    type='password'
                    name="password"
                    placeholder="비밀번호"
                    value={employeeData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={style.input_cover}>
                  <input
                    className={style.input}
                    name="name"
                    placeholder="이름"
                    value={employeeData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={style.input_cover}>
                  <input
                    className={style.input}
                    name="department"
                    placeholder="소속"
                    value={employeeData.department}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={style.input_cover}>
                  <input
                    type='text'
                    className={style.input}
                    name="position"
                    placeholder="직급"
                    value={employeeData.position}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={style.input_cover}>
                  <input
                    type='email'
                    className={style.input}
                    name="email"
                    placeholder="이메일"
                    value={employeeData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className={style.btn_submit}>사원 추가</button>
              </form>
              {/* <button className={style.btn_close} onClick={onRequestClose}>닫기</button> */}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default JoinComponent