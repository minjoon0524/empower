import React, { useEffect, useState } from 'react';
import { approveVacation, getMemberVacationList, getVacation } from '../../api/vacationApi'; // getVacation 함수 임포트
import styles from "./vacationList.module.css";
import ReactPaginate from 'react-paginate'; // 페이지네이션 컴포넌트 임포트
import useCustomLogin from '../../hooks/useCustomLogin';
import useCustomMove from '../../hooks/useCustomMove';
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
const MyVacationListComponent = ({ pageParam }) => {
    const { page, size, refresh, moveToVacationList } = useCustomMove();
    const [serverData, setServerData] = useState(initState);
    const {loginState}=useCustomLogin();
    const eid=loginState.eid
    const handlePageClick = ({ selected }) => {
      moveToVacationList({ page: selected + 1, size });
    };
  
    useEffect(() => {
      getVacation({ page, size },eid)
        .then((data) => {
          console.log(data);
          setServerData(data);
        })
        .catch((error) => {
          console.error("Error fetching vacation list:", error);
        });
    }, [page, size, refresh]);
  
    const [sortConfig, setSortConfig] = useState({
      key: null,
      direction: "ascending",
    });
  
    const handleSort = (key) => {
      let direction = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
  
      const sortedData = [...serverData.dtoList].sort((a, b) => {
        if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
        return 0;
      });
  
      setServerData((prevState) => ({
        ...prevState,
        dtoList: sortedData,
      }));
      setSortConfig({ key, direction });
    };
  
    const handleApprove = async (vacId) => {
      try {
        const result = await approveVacation({ vacId, vacStatus: 'APPROVE' }); // 서버에 승인 요청
        // 서버 응답에 따라 상태 업데이트
        if (result) {
          setServerData(prevState => ({
            ...prevState,
            dtoList: prevState.dtoList.map(item =>
              item.vacId === vacId ? { ...item, vacStatus: 'APPROVE' } : item
            )
          }));
        }
      } catch (error) {
        console.error("Error approving vacation:", error);
      }
    };
  
    const handleReject = async (vacId) => {
      try {
        const result = await approveVacation({ vacId, vacStatus: 'REJECT' }); // 서버에 거절 요청
        // 서버 응답에 따라 상태 업데이트
        if (result) {
          setServerData(prevState => ({
            ...prevState,
            dtoList: prevState.dtoList.map(item =>
              item.vacId === vacId ? { ...item, vacStatus: 'REJECT' } : item
            )
          }));
        }
      } catch (error) {
        console.error("Error rejecting vacation:", error);
      }
    };
  
    const getSortDirection = (name) => {
      if (sortConfig.key === name) {
        return (
          <span className={styles.sortIcon}>
            {sortConfig.direction === "ascending" ? " ▲" : " ▼"}
          </span>
        );
      }
      return <span className={styles.sortIcon}> ▼</span>;
    };
  
    const getStatusBadge = (status) => {
      let badgeClass = styles.statusBadge;
      let displayText = "";
    
      switch (status) {
        case 'PENDING':
          badgeClass += ` ${styles.statusPending}`;
          displayText = "대기 중";
          break;
        case 'APPROVE':
          badgeClass += ` ${styles.statusApproved}`;
          displayText = "승인됨";
          break;
        case 'REJECT':
          badgeClass += ` ${styles.statusRejected}`;
          displayText = "거절됨";
          break;
        default:
          displayText = status; // 알 수 없는 상태는 그대로 표시
          break;
      }
    
      return <span className={badgeClass}>{displayText}</span>;
    };
  
    const getLeaveTypeText = (vacType) => {
      switch (vacType) {
        case 'GENERAL':
          return '일반';
        case 'HALF_DAY':
          return '반차';
        case 'SICK_LEAVE':
          return '병가';
        case 'CONDOLENCE_SPOUSE':
          return '조사(배우자)';
        case 'CONDOLENCE_PARENT':
          return '조사(부모님)';
        case 'CONDOLENCE_SIBLING':
          return '조사(형제)';
        case 'MILITARY_SERVICE':
          return '예비군';
        default:
          return vacType; 
      }
    };
  
    const [filter, setFilter] = useState("ALL");
  
    const filteredData = serverData.dtoList.filter((item) => {
      if (filter === "ALL") return true;
      return item.vacStatus === filter;
    });
  
    return (
      <div className={styles.tableContainer}>
        <div className={styles.filterContainer}>
          <button onClick={() => setFilter("ALL")}>전체</button>
          <button onClick={() => setFilter("PENDING")}>대기</button>
          <button onClick={() => setFilter("APPROVE")}>승인</button>
          <button onClick={() => setFilter("REJECT")}>거절</button>
  
        </div>
  
        <div>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th
                  className={styles.headerCell}
                  onClick={() => handleSort("vacId")}
                >
                  No.{getSortDirection("vacId")}
                </th>
                {/* <th
                  className={styles.headerCell}
                  onClick={() => handleSort("memberName")}
                >
                  이름{getSortDirection("memberName")}
                </th>
                <th
                  className={styles.headerCell}
                  onClick={() => handleSort("department")}
                >
                  부서{getSortDirection("department")}
                </th>
                <th
                  className={styles.headerCell}
                  onClick={() => handleSort("position")}
                >
                  직급{getSortDirection("position")}
                </th> */}
                <th
                  className={styles.headerCell}
                  onClick={() => handleSort("vacType")}
                >
                  휴가유형{getSortDirection("vacType")}
                </th>
                <th
                  className={styles.headerCell}
                  onClick={() => handleSort("vacStartDate")}
                >
                  휴가 시작일{getSortDirection("vacStartDate")}
                </th>
                <th
                  className={styles.headerCell}
                  onClick={() => handleSort("vacEndDate")}
                >
                  휴가 종료일{getSortDirection("vacEndDate")}
                </th>
                <th
                  className={styles.headerCell}
                  onClick={() => handleSort("regTime")}
                >
                  휴가 등록일{getSortDirection("regTime")}
                </th>
                <th className={styles.headerCell}
                   onClick={() => handleSort("vacStatus")}
                
                >승인 상태{getSortDirection("vacStatus")}</th>
                <th className={styles.headerCell}></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.vacId} className={styles.tableRow}>
                  <td className={styles.tableCell}>{row.vacId}</td>
                  {/* <td className={styles.tableCell}>{row.memberName}</td>
                  <td className={styles.tableCell}>{row.department}</td>
                  <td className={styles.tableCell}>{row.position}</td> */}
                  <td className={styles.tableCell}>{getLeaveTypeText(row.vacType)}</td>                <td className={styles.tableCell}>{row.vacStartDate}</td>
                  <td className={styles.tableCell}>{row.vacEndDate}</td>
                  <td className={styles.tableCell}>{row.regTime}</td>
                  <td className={styles.tableCell}>
                    {getStatusBadge(row.vacStatus)}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* ReactPaginate */}
        <div>
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={serverData.totalPage}
            previousLabel="<"
            pageClassName={styles.pageItem}
            pageLinkClassName={styles.pageLink}
            previousClassName={styles.pageItem}
            previousLinkClassName={styles.pageLink}
            nextClassName={styles.pageItem}
            nextLinkClassName={styles.pageLink}
            breakLabel="..."
            breakClassName={styles.pageItem}
            breakLinkClassName={styles.pageLink}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            forcePage={serverData.current - 1}
          />
        </div>
      </div>
    );
  };
  

export default MyVacationListComponent;
