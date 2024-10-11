import React from "react";
import { useParams } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import MemberReadComponent from "../../components/Main/MemberRead/MemberReadComponent";

const MemberRead = () => {
  const title = "인적사항 상세페이지";
  const { eid } = useParams();
  return (
    <BasicLayout title={title}>
      <MemberReadComponent eid={eid}/>
    </BasicLayout>
  );
};

export default MemberRead;
