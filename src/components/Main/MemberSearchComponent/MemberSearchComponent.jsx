import React, { useEffect, useState } from "react";

import style from "./MemberSearchComponent.module.css";
//import 'bootstrap/dist/css/bootstrap.min.css'; // 전체가 아닌 필요한 부분만 가져오기
import useCustomLogin from "../../../hooks/useCustomLogin";
import { getMemberList } from "../../../api/memberApi";
import useCustomMove from "../../../hooks/useCustomMove";
import ReactPaginate from "react-paginate";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const MemberSearchComponent = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();

  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getMemberList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size, refresh]);
  const handlePageClick = ({ selected }) => {
    moveToList({ page: selected + 1, size }); // 페이지 번호는 0부터 시작하므로 +1
  };

  return (
    <div>
      {" "}
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>부서</th>
            <th>직급</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>가입승인</th>
          </tr>
        </thead>
        <tbody>
          {serverData.dtoList.map((member) => (
            <tr key={member.eid}>
              <td>{member.name}</td>
              <td>{member.department}</td>
              <td>{member.position}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{member.memberCheck ? "승인" : "미승인"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={serverData?.totalPage}
        previousLabel="<"
        pageClassName={style.pageItem} // 커스텀 클래스 사용
        pageLinkClassName={style.pageLink}
        previousClassName={style.pageItem}
        previousLinkClassName={style.pageLink}
        nextClassName={style.pageItem}
        nextLinkClassName={style.pageLink}
        breakLabel="..."
        breakClassName={style.pageItem}
        breakLinkClassName={style.pageLink}
        containerClassName={style.pagination}
        activeClassName={style.active}
        renderOnZeroPageCount={null}
        forcePage={serverData?.page}
      />
    </div>
  );
};

export default MemberSearchComponent;
