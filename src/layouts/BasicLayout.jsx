import React from "react";
import BasicMenu from "../menus/BasicMenu";
import style from "./BasicLayout.module.css";
import CategoryMenu from "../menus/CategoryMenu";

const BasicLayout = ({ children,title }) => {
  return (
    <div>
      <BasicMenu />
      <div>
        <CategoryMenu />
      </div>
      <main className={style.main_container}>
        {/* title */}
        <header className={style.main_header}><h3 className={style.main_title}>{title}</h3></header>
       
        
        {children}
        <div ></div>
      </main>
    </div>
  );
};

export default BasicLayout;
