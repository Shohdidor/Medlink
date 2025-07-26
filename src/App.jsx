import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./pages/Login/Login.jsx"
import Menu from './pages/Menu/Menu.jsx'
import Layout from './Layout/Layout.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Registration from './pages/Registration/Registration.jsx'
import NotFound from './pages/404/Page404.jsx'
import Doctors from './pages/Find_a_Doctors/Doctors.jsx'
import OrderDrugs from './pages/OrderDrugs/OrderDrugs.jsx'
import Call from './pages/Call/Call.jsx'
import VideoCallPage from './pages/Call/VideoCall.jsx'
import PremiumPage from './pages/premium/premium.jsx'
import Choice from './Choice.jsx'
import DocLogin from './pages/Doctor/DocLogin.jsx'
import Info from './pages/infoDoctor/Info.jsx'
import InfoDrugs from './pages/infoDrugs/InfoDrugs.jsx'
import DoctorLog from './pages/Doctor/DoctorLog.jsx'
import DoctorsProfile from './pages/DoctorsProfile/DoctorsProfile.jsx'
function App() {
  const router = createBrowserRouter ([
    {
      path : "//",
      element : <Choice />
    },
    {
      path : "login",
      element : <Login />
    },
    {
      path : "doclogin",
      element : <DocLogin />
    },
    {
      path : "registration",
      element : <Registration />
    },
    {
      path : "doctorlog",
      element : <DoctorLog />
    },
    {
      path : "doctorprofile",
      element : <DoctorsProfile />
    },
    {
      path : "/menu",
      element : <Layout />,
      children : [
        {
          index : true ,
          element : <Menu />
        },
        {
          path : "doctors",
          element : <Doctors />
        },
        {
          path : "orderdrugs",
          element : <OrderDrugs />
        },
        {
          path : "videocall",
          element : <VideoCallPage />
        },
        { 
          path : "call",
          element : <Call />
        },
        {
          path : "premium",
          element : <PremiumPage />
        },
        {
          path:"info/:id",
          element:<Info/> 
        },
        {
          path : "infodrugs/:id",
          element : <InfoDrugs />
        }
      ]
    },
    {
          path : "*",
          element: <NotFound />
    },
    {
          path : "profile",
          element : <Profile />
    },
  ])
  return <RouterProvider router={router} />
}

export default App