import React, { lazy } from 'react';
const Home = lazy(() => import('../pages'));
const Users = lazy(() => import('../pages/Users'));


const ERROR404 = lazy(() => import('../pages/ErrorPages/Error404'));
const ERROR500 = lazy(() => import('../pages/ErrorPages/Error500'));
const ERROR503 = lazy(() => import('../pages/ErrorPages/Error503'));

const Login = lazy(() => import('../pages/Authentication/Login'));

const routes = [

    // Home
    {
        path: '/',
        element: <Home />,
        layout: 'default',
    },


    //error pages
    {
        path: '/pages/error500',
        element: <ERROR500 />,
        layout: 'blank',
    },
    {
        path: '/pages/error503',
        element: <ERROR503 />,
        layout: 'blank',
    },
    {
        path: '*',
        element: <ERROR404 />,
        layout: 'blank',
    },

    //Authentication
    {
        path: '/auth/login',
        element: <Login />,
        layout: 'blank',
    },

    //Authentication

    {
        path: '/admin/users',
        element: <Users />,
        layout: 'default',
    },
];

export { routes };
