import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import NotFound from "./pages/NotFound.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import useAuthContext from "./hooks/useAuthContext.js";



function App() {
  const {user} = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="min-h-[100vh] overflow-hidden bg-white">
          <Navbar />
          <Outlet />
        </div>
      ),
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: user ? <Home /> : <Login />
        },
        {
          path: "/signup",
          element: user ? <Home /> : <Signup />
        },
        {
          path: "/login",
          element: user ? <Home /> : <Login />
        }
      ]
    }
  ]); 

  return <RouterProvider router={router}/>
}

export default App;
