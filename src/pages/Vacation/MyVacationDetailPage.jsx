import React from 'react'
import BasicLayout from './../../layouts/BasicLayout';
import MyVacationDetailComponent from '../../components/Vacation/MyVacationDetailComponent';
import { useParams } from 'react-router-dom';

const MyVacationDetailPage = () => {
    const {vacId} =useParams()
    const title = "휴가상세내역"
  return (
    <BasicLayout title={title}>
      <MyVacationDetailComponent vacId={vacId} />
    </BasicLayout>
  )
}

export default MyVacationDetailPage
