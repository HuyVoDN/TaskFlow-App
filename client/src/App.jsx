import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Registration from './pages/Registration/Registration';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Profile/Profile';
import Forgot from './pages/ForgotPassword/Forgot';
import Reset from './pages/ResetPassword/Reset';
import Navbar from './Navbar/Navbar'
import './App.scss'
import { AuthProvider } from './Context/auth/AuthContext';
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
        element: <Landing />
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
        path: "/forgotpassword",
        element: <Forgot/>
      },
      {
        path: "/resetpassword/:token",
        element: <Reset/>
      }
      ,
      {
        path: "*",
        element: <NotFound/>
      }

    ]
  }
]);
function App() {

  return (
    <AuthProvider>
      <div className='app-container'>
        
        <RouterProvider router={router}/>
      </div>
    </AuthProvider>
  );
}

export default App;
