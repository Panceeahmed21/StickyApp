import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Notfound from "./components/Notfound/Notfound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { RecoilRoot } from "recoil";
function App() {
  let routing = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <RecoilRoot>
        <RouterProvider router={routing}></RouterProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
