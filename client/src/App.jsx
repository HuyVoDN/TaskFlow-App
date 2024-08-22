import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registration from './pages/Registration/Registration';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Profile/Profile';
import Navbar from './Navbar/Navbar'
import './App.scss'
const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );

};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },

      {
        path: "/login",
        element: <Login/>
      },

      {
        path: "/registration",
        element: <Registration/>
      },

      {
        path: "/profile",
        element: <Profile/>
      },

      {
        path: "*",
        element: <NotFound/>
      }
    ]
  }
]);
function App() {

  return (
    <>
      <div className='app-container'>
        <Navbar></Navbar>
        <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App
