import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import NotFound from "./pages/NotFound.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";

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
        element: <Home />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/login",
        element: <Login />
      }
    ]
  }
]) 

function App() {

  return <RouterProvider router={router}/>

}

export default App;
