import Profile from '@/pages/Profile/profile';
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
    }

];




export default routes;