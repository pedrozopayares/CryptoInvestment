import { createBrowserRouter } from "react-router-dom";

import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/auth/Login';
import PanelLayout from '@/layouts/PanelLayout';
import Home from '@/pages/panel/home/Home';
import Register from "@/pages/auth/Register";

const routes = createBrowserRouter([
    {
      path: "/",
      element: <PanelLayout />,
      children: [
        {
          path: "home",
          element: <Home />,
        }
      ]
    },
    //anidar ruta login en AuthLayout
    {
      path: "/login",
      element: <AuthLayout><Login /></AuthLayout>,
    },
    {
      path: "/register",
      element: <AuthLayout><Register /></AuthLayout>,
    },
  ]);

  export default routes;