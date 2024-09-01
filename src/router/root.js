import LoginPage from "../pages/Login/LoginPage";
const { createBrowserRouter } = require("react-router-dom");

const root = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  // },
  // {
  //   path: "about",
  //   element: <AboutPage />,
  // },
  // {
  //   path: "todo",
  //   element: <IndexPage />,
  //   children: todoRouter()
  // },
  // {
  //   path: "member",
  //   children: memberRouter()
     }
]);

export default root;
