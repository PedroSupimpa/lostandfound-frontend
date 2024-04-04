// Assuming your file structure remains the same, and `Home` is your lazy-loaded component
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Signup from '../pages/signup';

const Home = lazy(() => import('../pages/home'));

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/signup',
        element: <Signup />,
    }
];


export default routes;