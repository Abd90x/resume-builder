import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layout
import MainLayout from "@/layouts/MainLayout";

// Pages
import Dashboard from "@/pages/Dashboard";
import Signin from "@/auth/Signin";
import Home from "@/pages/Home";
import ResumeEdit from "@/pages/ResumeEdit";
import Resume from "@/pages/Resume";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <ResumeEdit />,
      },
      {
        path: "/dashboard/resume/:resumeId",
        element: <Resume />,
      },
    ],
  },
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
