import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  Outlet,
} from "react-router-dom"
import LoginPage from './loginPage/LoginPage'
import RegisterPage from './loginPage/RegisterPage'
import Navbar from './components/Navbar'
import HomePage from './userPage/HomePage'
import DestinationPage from './destinationsPage/DestinationPage'
import MyTrips from './myTripPage/MyTripPage'




const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/login",
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token")
      if (isLoggedIn) {
        throw redirect("/")
      } else {
        return null
      }
    },
    element: <LoginPage />,
  },
  {
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token")
      if (isLoggedIn) {
        return null
      } else {
        throw redirect("/login")
      }
    },
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/destinations",
        element: <DestinationPage />
      },
      {
        path: "/my-trips",
        element: <MyTrips />
      },
    ]
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
