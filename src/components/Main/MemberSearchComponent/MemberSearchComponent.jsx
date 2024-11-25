import React, { useEffect, useState } from "react";
import style from "./MemberSearchComponent.module.css";
import useCustomMove from "../../../hooks/useCustomMove";
import { getMemberList } from "../../../api/memberApi";
import ReactPaginate from "react-paginate";
import JoinComponent from "../../Join/JoinComponent"; // JoinComponent 임포트

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
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [searchField, setSearchField] = useState("name"); // 검색 옵션
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 상태 추가

  useEffect(() => {
    fetchMembers();
  }, [page, size, refresh]);

  const fetchMembers = async () => {
    try {
      const data = await getMemberList({ page, size, searchTerm, searchField });
      setServerData(data);
    } catch (error) {
      if (error.response && error.response.data.error === "ERROR_ACCESS_TOKEN") {
        alert("액세스 토큰이 만료되었습니다. 다시 로그인 해주세요.");
      } else {
        console.error("회원 목록 가져오기 오류:", error);
      }
    } finally {
      // any necessary cleanup
    }
  };

  const handlePageClick = ({ selected }) => {
    moveToList({ page: selected + 1, size });
  };

  const handleSearch = () => {
    fetchMembers(); // 검색어에 따라 멤버 목록 새로 가져옴
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className={style.member_search_area}>
      <div className={style.search_form}>
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
            <option value="eid">사번</option>
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
            <a className={style.search_btn} onClick={handleSearch}>
              검색
            </a>{" "}

            <a className={style.add_person_btn} onClick={openModal}>
            사원추가
          </a>
            {/* 검색 버튼 클릭 시 검색 */}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={style.loading}>
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <table style={{ width: "84%" }} className={style.memberSearchTable}>
            <thead>
              <tr>
              <th style={{ width: "30px" }}>번호</th>
                <th style={{ width: "60px" }}>이름</th>
                <th style={{ width: "60px" }}>부서</th>
                <th style={{ width: "60px" }}>직급</th>
                <th style={{ width: "90px" }}>사번</th>
                <th style={{ width: "90px" }}>전화번호</th>
               
              </tr>
            </thead>
            <tbody>
              {serverData.dtoList.map((member,index) => (
                <tr key={member.eid} onClick={() => moveToRead(member.eid)}>
              <td>{(serverData.current - 1) * size + index + 1}</td>
                  <td>{member.name}</td>
                  <td>{member.department}</td>
                  <td>{member.position}</td>
                  <td>{member.eid}</td>
                  <td>{member.phone}</td>
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

      <JoinComponent isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default MemberSearchComponent;