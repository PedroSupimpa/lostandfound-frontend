import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';


const Home = lazy(() => import('../pages/home'));

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },


];


export default routes;