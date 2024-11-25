import React, { useState } from "react";
import style from "./LoginComponent.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginPostAsync } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
  employeeNumber: "",
  pw: "",
};

const LoginComponent = () => {

  // 로그인을 위한 useState
  const [loginParam, setLoginParam] = useState({ ...initState });

  // 로그인 버튼을 클릭했을 때 전체 상태가 바뀌게 하기위해 사용
  //useDispatch에 들어갈 값은 유지해야할 데이터 값
  const disPatch = useDispatch();

  // loginCustomHooks
  const {doLogin,moveToPath}=useCustomLogin()

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = (e) => {
    doLogin(loginParam).then(data=>{
      if(data.error){
        alert("사번과 비밀번호를 확인해주세요.")
      }else{
        alert("환영합니다.")
        moveToPath("/member/attendance/read")
      }
    })
  };

  // 비밀번호 표시를 위한 useState
  const [showPassword, setShowPassword] = useState(false);

  // 비밀번호 표시 상태를 토글
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const goToJoin = () => {
    navigate("/join");
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
                    name="employeeNumber"
                    onChange={handleChange}
                    value={loginParam.employeeNumber}
                    placeholder="사번"
                />
              </div>
              <div className={style.input_cover}>
                {/* 비밀번호 입력 필드 */}
                <input
                    type={showPassword ? "text" : "password"} // 상태에 따라 필드 타입 변경
                    className={style.input}
                    name="pw"
                    onChange={handleChange}
                    value={loginParam.pw}
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
              <button className={style.btn_submit} onClick={handleClickLogin}>
                로그인
              </button>
              {/* <button className={style.btn_submit} onClick={goToJoin}>
                회원가입
              </button> */}
            </div>
          </div>
        </div>
      </div>
  );
};

export default LoginComponent;