import { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const useCustomMove = () => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const [refresh, setRefresh] = useState(false); //추가

  const getNum = (param, defaultValue) => {
    if (!param) {
      return defaultValue;
    }
    return parseInt(param, 10);
  };

  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 10);

  // page=3&size=10
  const queryDefault = createSearchParams({ page, size }).toString();

  const moveToList = (pageParam) => {
    let queryStr = "";
    if (pageParam) {
      const pageNum = getNum(pageParam.page, 1);
      const sizeNum = getNum(pageParam.size, 10);
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }

    setRefresh(!refresh);
    navigate({ pathname: `../search`, search: `?${queryStr}` });
  };

  const moveToModify = (eid) => {
    navigate({
      pathname: `../modify/${eid}`,
      search: `?${queryDefault}`,
    });
  };

  const moveToModifyVacation = (vacId) => {
    navigate({
      pathname: `../modify/${vacId}`,
      search: `?${queryDefault}`,
    });
  };

  const moveToRead = (num) => {
    navigate({
      pathname: `../read/${num}`,
      search: `?${queryDefault}`,
    });
  };

  const moveToAttendanceList = (pageParam) => {
    let queryStr = "";
    if (pageParam) {
      const pageNum = getNum(pageParam.page, 1);
      const sizeNum = getNum(pageParam.size, 10);
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    }

    setRefresh(!refresh);
    navigate({ pathname: `../attendance/list`, search: `?${queryStr}` });
  };

  const moveToVacationList = (pageParam) => {
    let queryStr = "";
    if (pageParam) {
      const pageNum = getNum(pageParam.page, 1);
      const sizeNum = getNum(pageParam.size, 10);
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    }

    setRefresh(!refresh);
    navigate({ pathname: `../list`, search: `?${queryStr}` });
  };


  const moveToMyVacationList = (pageParam) => {
    let queryStr = "";
    if (pageParam) {
      const pageNum = getNum(pageParam.page, 1);
      const sizeNum = getNum(pageParam.size, 10);
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    }

    setRefresh(!refresh);
    navigate({ pathname: `../myList`, search: `?${queryStr}` });
  };


  return {
    moveToList,
    moveToModify,
    moveToRead,
    moveToAttendanceList,
    moveToVacationList,
    moveToMyVacationList,
    page,
    size,
  };
};

export default useCustomMove;
