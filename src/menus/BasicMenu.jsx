import React from "react";
import style from "./Menu.module.css";
const BasicMenu = () => {
  return (
    <nav className={style.container}>
      <div className={style.nav_item}>
        <a className={style.title}>Empower</a>
        <div className={style.profile_container}>
          <div className={style.user_profile}>
            <button type="button" className={style.profile_thumbnail}>
              <img
                src="https://static.worksmobile.net/static/pwe/wm/common/ic80_nomember.png"
                width="32"
                height="32"
                alt="사용자 정보"
              />
            </button>
          </div>
          <div>개발1팀 홍길동</div>
        </div>
      </div>
    </nav>
  );
};

export default BasicMenu;
