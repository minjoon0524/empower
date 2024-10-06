import React from "react";
import { Link } from "react-router-dom";
import style from "./Menu.module.css";
const CategoryMenu = () => {
  return (
    <div className={style.category_container}>
      <div className={style.category_item}>
        <div className={style.menu_box}>
          <strong className={style.menu_section_title}>공통 관리</strong>
          <ul class="menu_list">
            <li class="general">
              <a data-lwds-atom="true" className={style.item_txt} href="#">
                인사관리
              </a>
              <ul className={style.sub_menu}>
                <li class="">
                  <Link
                    to="/member/search"
                    data-lwds-atom="true"
                    className={style.sub_item}
                  >
                    직원조회
                  </Link>
                </li>
                <li class="">
                  <a data-lwds-atom="true" className={style.sub_item} href="#">
                    맞춤 설정
                  </a>
                </li>
              </ul>
            </li>
            <li class="member">
              <a data-lwds-atom="true" className={style.item_txt} href="#">
                근태관리
              </a>
              <ul className={style.sub_menu}>
                <li class="">
                  <a data-lwds-atom="true" className={style.sub_item} href="#">
                    구성원
                  </a>
                </li>
                <li class="">
                  <a data-lwds-atom="true" className={style.sub_item} href="#">
                    구성원 초대
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;
