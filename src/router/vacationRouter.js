import React from 'react'
import { Suspense, lazy } from "react";
import { ClipLoader } from "react-spinners";
import UpdateVacationPage from '../pages/Vacation/UpdateVacationPage';

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
const MyList= lazy(() => import("../pages/Vacation/MyVacationListPage"));
const MyDetail= lazy(() => import("../pages/Vacation/MyVacationDetailPage"));
const UpdateVacation= lazy(() => import("../pages/Vacation/UpdateVacationPage"));

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
        {
          path: "myList",
          element: (
            <Suspense fallback={Loading}>
              <MyList/>
            </Suspense>
          ),
        },

        {
          path: "read/:vacId",
          element: (
            <Suspense fallback={Loading}>
              <MyDetail/>
            </Suspense>
          ),
        },

        
    {
      path: "modify/:vacId",
      element: (
        <Suspense fallback={Loading}>
          <UpdateVacation />
        </Suspense>
      ),
    },
  
  
    ];
  };

export default vacationRouter
