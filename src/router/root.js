import MainPage from "../pages/Main/MainPage";
import JoinPage from "../pages/Join/JoinPage";
import LoginPage from "../pages/Login/LoginPage";
import ApprovePage from './../pages/Approve/ApprovePage';
import MemberSearchPage from "../pages/MemberSearch/MemberSearchPage";

const { createBrowserRouter } = require("react-router-dom");

const root = createBrowserRouter([
  {
    path: "main",
    element: <MainPage />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "join",
    element: <JoinPage />,
  },

  {
    path: "approve",
    element: <ApprovePage />,
  },
  {
    path: "search",
    element: <MemberSearchPage />,
  },
  // {
  //   path: "todo",
  //   element: <IndexPage />,
  //   children: todoRouter()
  // },
  // {
  //   path: "member",
  //   children: memberRouter()
     
]);

export default root;
