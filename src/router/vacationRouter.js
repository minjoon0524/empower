import React from 'react'
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

const Vacation = lazy(() => import("../pages/Vacation/VacationPage"));
const AdminList= lazy(() => import("../pages/Vacation/AdminVacationList"));

const vacationRouter = () => {
    return [
  
        {
          path: "form",
          element: (
            <Suspense fallback={Loading}>
              <Vacation/>
            </Suspense>
          ),
        },


        {
          path: "list",
          element: (
            <Suspense fallback={Loading}>
              <AdminList/>
            </Suspense>
          ),
        },
  
  
    ];
  };

export default vacationRouter
