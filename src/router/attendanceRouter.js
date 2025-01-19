import { Suspense, lazy } from "react";
import { ClipLoader } from "react-spinners";

const Loading = (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }}>
    <ClipLoader color="#36D7B7" size={50} />
  </div>)
const Login = lazy(() => import("../pages/Login/LoginPage"));
const Search = lazy(() => import("../pages/MemberSearch/MemberSearchPage"));
const UpdateMember =lazy(() =>import("../pages/UpdateMemberPage/UpdateMemberPage"))
const Read =lazy(() =>import("../pages/MemberRead/MemberReadPage"))
const  MemberAttendance=lazy(() =>import("../pages/MemberAttendance/MemberAttendancePage"))


const attendanceRouter = () => {
  return [

      {
        path: "read",
        element: (
          <Suspense fallback={Loading}>
            <MemberAttendance/>
          </Suspense>
        ),
      },


  ];
};

export default attendanceRouter;
