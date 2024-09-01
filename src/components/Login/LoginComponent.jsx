import React, { useState } from "react";
import style from "./LoginComponent.module.css";

const initState = {
  employeeNumber: "",
  pw: "",
};

const LoginComponent = () => {
  // 비밀번호 표시를 위한 useState
  const [showPassword, setShowPassword] = useState(false);

  // 비밀번호 표시 상태를 토글
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={style.container}>
      <div className={style.contents}>
        <div className={style.contents_box}>
          {/* 첫번째 */}
          <div className={style.logo}>
            <h1>EMPOWER</h1>
            <h2 className={style.title}>로그인을 통해, EMPOWER와 함께해요.</h2>
          </div>

          {/* 두번째 */}
          <div className={style.logo}>
            <div className={style.input_cover}>
              <input
                type="text"
                className={style.input}
                placeholder="사번"
              />
            </div>
            <div className={style.input_cover}>
              {/* 비밀번호 입력 필드 */}
              <input
                type={showPassword ? "text" : "password"} // 상태에 따라 필드 타입 변경
                className={style.input}
                placeholder="비밀번호"
              />
            </div>
            <div className={style.show_password}>
              <label>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
                비밀번호 보기
              </label>
            </div>
            <button className={style.btn_submit}>로그인</button>
            <button className={style.btn_submit}>회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
