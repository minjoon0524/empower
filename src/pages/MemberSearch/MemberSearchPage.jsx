import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import MemberSearchComponent from '../../components/Main/MemberSearchComponent/MemberSearchComponent'

const MemberSearchPage = () => {
    const title= "인적사항 관리"
    return (
      <BasicLayout title={title}>
       <MemberSearchComponent/>
      </BasicLayout>
    )
}

export default MemberSearchPage
