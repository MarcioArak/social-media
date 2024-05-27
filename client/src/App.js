import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import "./style2.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div className="page" style={{ display: "flex" }}>
            <LeftBar />
            <div className="midPage" style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/meso-social/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/meso-social/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/meso-social/login",
      element: <Login />,
    },
    {
      path: "/meso-social/register",
      element: <Register />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// Modules to install
//
// 1. npm install react-router-dom
//    - routers
// 2. npm install sass
//    - styling (might not need to install maybe just have to name file .scss)
// 3. npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
//    - icons
// 4. npm install axios
//    - Make request to the api
// 5. npm install @tanstack/react-query
//    - https://tanstack.com/query/latest/docs/framework/react/overview
//    - data fetching, caching, sumchronizing and updating server state
//    - user SQL queries
// 6. npm install moment
//    - library for dates (time)
// 7. npm install react-bootstrap bootstrap
//    - Used to make dropdown list
