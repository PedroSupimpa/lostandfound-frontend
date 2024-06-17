
import Profile from '@/pages/Profile/profile';
import MyPosts from '@/pages/myposts/myposts';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';


const Home = lazy(() => import('../pages/home'));


const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/myposts',
        element: <MyPosts />,
    }

];




export default routes;