// Assuming your file structure remains the same, and `Home` is your lazy-loaded component
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('../pages/home'));

const routes: RouteObject[] = [
    {
        path: '/teste',
        element: <Home />,
    },
];


export default routes;