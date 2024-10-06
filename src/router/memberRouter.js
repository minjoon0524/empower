import { Suspense, lazy } from "react";

const Loading = <div>Loading</div>;
const Login = lazy(() => import("../pages/Login/LoginPage"));
const Search = lazy(() => import("../pages/MemberSearch/MemberSearchPage"));
const UpdateMember =lazy(() =>import("../pages/UpdateMemberPage/UpdateMemberPage"))


const memberRouter = () => {
  return [
    // {
    //   path: "login",
    //   element: (
    //     <Suspense fallback={Loading}>
    //       <Login />
    //     </Suspense>
    //   ),
    // },
    {
      path: "search",
      element: (
        <Suspense fallback={Loading}>
          <Search />
        </Suspense>
      ),
    },

    {
        path: "modify",
        element: (
          <Suspense fallback={Loading}>
            <UpdateMember />
          </Suspense>
        ),
      },


  ];
};

export default memberRouter;
