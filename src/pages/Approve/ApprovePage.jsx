import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import ApproveComponent from '../../components/Main/ApproveComponent/ApproveComponent'


const ApprovePage = () => {
  const title= "가입승인"
  return (
    <BasicLayout title={title}>
        <ApproveComponent/>
    </BasicLayout>
  )
}

export default ApprovePage
