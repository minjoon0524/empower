import React, { useEffect, useState } from "react";
import style from "./MemberSearchComponent.module.css";
import useCustomMove from "../../../hooks/useCustomMove";
import { getMemberList } from "../../../api/memberApi";
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
  const { page, size, refresh, moveToList } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 useState
  const [searchField, setSearchField] = useState("name"); // 검색 Option State 
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태


  useEffect(() => {
    fetchMembers();
  }, [page, size, refresh]);

  const fetchMembers = () => {
    setIsLoading(true); // 데이터 요청 시작 시 로딩 상태 true
    getMemberList({ page, size, searchTerm, searchField }).then((data) => {
      setServerData(data);
      setIsLoading(false); // 데이터 요청 시작 시 로딩 상태 true
    });
  };

  const handlePageClick = ({ selected }) => {
    moveToList({ page: selected + 1, size });
  };

  const handleSearch = () => {
   
    fetchMembers(); // 검색어에 따라 멤버 목록을 새로 가져옴
  };

  return (
    <div className={style.member_search_area}>
      <div className={style.search_form}>
        <div className={style.search_item}>
          <a className={style.add_person_btn}>사원추가</a>
        </div>

        <div className={style.search_item}>
          <select 
            name="search" 
            className={style.pl}
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)} // 검색 필드 변경
          >
            <option value="name">이름</option>
            <option value="department">부서</option>
            <option value="position">직급</option>
            <option value="email">이메일</option>
            <option value="tel">전화번호</option>
          </select>
          <div className={style.search_item}>
            <input 
              type="text" 
              className={style.member_input} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // 검색어 변경
            />
          </div>
          <div>
            <a className={style.search_btn} onClick={handleSearch}>검색</a> {/* 검색 버튼 클릭 시 검색 */}
          </div>
        </div>
      </div>
      {isLoading ? ( // 로딩 상태일 때 표시할 UI
        <div className={style.loading}><span class="loader"></span></div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>이름</th>
                <th>부서</th>
                <th>직급</th>
                <th>이메일</th>
                <th>전화번호</th>
                <th>수정</th>
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
                  <td>
                    <a>수정</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={serverData.totalPage}
            previousLabel="<"
            pageClassName={style.pageItem}
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
            forcePage={serverData.current - 1} // 현재 페이지 설정
          />
        </>
      )}
    </div>
  );
};

export default MemberSearchComponent;