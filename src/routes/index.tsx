import Profile from "@/pages/Profile/profile";
import MyPosts from "@/pages/myposts/myposts";
import CreatePost from "@/pages/CreatePost/createPost";
import Messages from "@/pages/Messages/messages";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("../pages/home"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/myposts",
    element: <MyPosts />,
  },
  {
    path: "/create-post",
    element: <CreatePost />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
];

export default routes;
