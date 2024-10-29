
import { useParams } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

import React from 'react'
import MemberAttendanceComponent from "../../components/Attendance/MemberAttendanceComponent";
import PersonalAttendanceTable from "../../components/Attendance/PersonalAttendanceTable";

const MemberAttendancePage = () => {
     const title="근태관리 | 내 출근부"
     const {eid}=useParams()
    return (
     
        <BasicLayout title={title}>
          <MemberAttendanceComponent eid={eid}/>
          <PersonalAttendanceTable eid={eid}/>
        </BasicLayout>
      );
}

export default MemberAttendancePage
