import React from 'react'
import UpdateMemberComponent from '../../components/Main/UpdateMemberComponent/UpdateMemberComponent'
import BasicLayout from '../../layouts/BasicLayout'

const UpdateMemberPage = () => {
    const title= "인적사항 수정"
    return (
      <BasicLayout title={title}>
       <UpdateMemberComponent/>
      </BasicLayout>
    )
}

export default UpdateMemberPage
