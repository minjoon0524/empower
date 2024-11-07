import React, { useEffect, useState } from "react";
import style from "../Main/MemberSearchComponent/MemberSearchComponent.module.css";
import useCustomMove from "../../hooks/useCustomMove";
import { getAttendanceList } from "../../api/attendanceApi";
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

const AdminAttendanceComponent = () => {
  const { page, size, refresh, moveToList, moveToRead,moveToAttendanceList } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [searchField, setSearchField] = useState("name"); // 검색 옵션
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [startDate, setStartDate] = useState(""); // 날짜 선택

  useEffect(() => {
    fetchMembers()
  }, [page, size, refresh]);

  const fetchMembers = async () => {
    try {
      const data = await getAttendanceList({ 
        page, 
        size, 
        searchTerm, 
        searchField, 
        date: startDate
      });
      console.log(data)
      const formattedData = data.dtoList.map(member => ({
        employeeId: member.employeeId,
        eid: member.eid,
        name: member.name,
        department: member.department,
        checkInTime: member.checkInTime,
        checkOutTime: member.checkOutTime,
        status: member.status,
      }));
      setServerData({ ...data, dtoList: formattedData });
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
    moveToAttendanceList({ page: selected + 1, size });
  };

  const handleSearch = () => {
    fetchMembers(); // 검색어와 날짜에 따라 멤버 목록 새로 가져옴
  };

  const getStatusText = (status) => {
    switch (status) {
      case "CHECKED_IN":
        return "출근";
      case "CHECKED_OUT":
        return "퇴근";
      case "LATE":
        return "지각";
      case "ABSENT":
        return "결근";
      default:
        return "미등록";
    }
  };

  return (
    <div className={style.member_search_area2}>
      <div className={style.search_form2}>


        <div className={style.search_item2}>
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
            <a className={style.search_btn} onClick={handleSearch}>
              검색
            </a>{" "}
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
                <th>번호</th>
                <th>직원 ID</th>
                <th>이름</th>
                <th>부서</th>
                <th>출근 시간</th>
                <th>퇴근 시간</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {serverData.dtoList.map((memberData, index) => (
                <tr key={memberData.eid}>
                  <td>{index + 1}</td>
                  <td>{memberData.eid}</td>
                  <td>{memberData.name}</td>
                  <td>{memberData.department}</td>
                  <td>{memberData.checkInTime}</td>
                  <td>{memberData.checkOutTime}</td>
                  <td>{getStatusText(memberData.status)}</td>
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

export default AdminAttendanceComponent;