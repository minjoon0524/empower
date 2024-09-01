import JoinPage from "../pages/Join/JoinPage";
import LoginPage from "../pages/Login/LoginPage";
const { createBrowserRouter } = require("react-router-dom");

const root = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "join",
    element: <JoinPage />,
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
