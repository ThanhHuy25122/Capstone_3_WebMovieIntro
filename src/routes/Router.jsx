import ShowtimeManagement from "pages/showtime-management/ShowtimeManagement";
import UserForm from "pages/user-form/UserForm";
import UserManagement from "pages/user-management/UserManagement";
import React from "react";
import { useRoutes } from "react-router-dom";
import AdminGuard from "../guards/AdminGuard";
import AuthGuard from "../guards/AuthGuard";
import NoAuthGuard from "../guards/NoAuthGuard";
import AdminLayout from "../layouts/admin/AdminLayout";
import HomeLayout from "../layouts/home/HomeLayout";
import Booking from "../pages/booking/Booking";
import HomePage from "../pages/home/HomePage";
import Login from "../pages/login/Login";
import MovieDetail from "../pages/movie-detail/MovieDetail";
import MovieForm from "../pages/movie-form/MovieForm";
import MovieManagement from "../pages/movie-management/MovieManagement";
import Register from "../pages/register/Register";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/movie-detail/:movieId",
          element: <MovieDetail />,
        },
        {
          path: "/",
          element: <AuthGuard />,
          children: [
            {
              path: "/booking/:showtimeId",
              element: <Booking />,
            },
          ],
        },
        {
          path: "/",
          element: <NoAuthGuard />,
          children: [
            {
              path: "/login",
              element: <Login />,
            },
            {
              path: "/register",
              element: <Register />,
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <AdminGuard />,
          children: [
            {
              path: "/admin/movie-management",
              element: <MovieManagement />,
            },
            {
              path: "/admin/movie-management/add",
              element: <MovieForm />,
            },
            {
              path: "/admin/movie-management/edit/:movieId",
              element: <MovieForm />,
            },
            {
              path: "/admin/movie-management/showtime-management/add/:movieId",
              element: <ShowtimeManagement />,
            },
            {
              path: "/admin/user-management",
              element: <UserManagement />,
            },
            {
              path: "/admin/user-management/add",
              element: <UserForm />,
            },
          ],
        },
      ],
    },
  ]);

  return routing;
}
