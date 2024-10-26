import App from "@/App";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/Signup";
import Auth from "@/pages/auth/Signup";
import Chat from "@/pages/chat";
import Profile from "@/pages/profile";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: <Auth />,
  },
]);

export default router;
