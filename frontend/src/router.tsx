import { createBrowserRouter } from "react-router"
import RootLayout from "../app/root"

import Home from "../app/routes/home"
import PostDetail from "../app/routes/post-detail"
import CreatePost from "../app/routes/create-post"
import EditPost from "../app/routes/edit-post"
import Login from "../app/routes/login"
import Signup from "../app/routes/signup"
import Profile from "../app/routes/profile"

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "post/:id",
        element: <PostDetail />,
      },
      {
        path: "create",
        element: <CreatePost />,
      },
      {
        path: "edit/:id",
        element: <EditPost />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
])
