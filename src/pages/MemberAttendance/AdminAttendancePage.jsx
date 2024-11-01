import React from 'react'
import AdminAttendanceComponent from './../../components/Attendance/AdminAttendanceComponent';
import BasicLayout from '../../layouts/BasicLayout';

const AdminAttendancePage = () => {
const title ="근태관리"

  return (
    <BasicLayout title={title}>
      <AdminAttendanceComponent/>
    </BasicLayout>
  )
}

export default AdminAttendancePage
