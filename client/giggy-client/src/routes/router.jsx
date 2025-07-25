import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import HomeLayout from '../layouts/HomeLayout';
import AuthLayout from '../layouts/AuthLayout';
import ErrorPage from '../components/ErrorPage';

import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import ForgotPass from '../components/ForgotPass';
import PrivateRoute from '../provider/PrivateRoute';
import AddTask from '../components/AddTask';
import BrowseTasks from '../components/BrowseTasks';
import ViewDetails from '../components/ViewDetails';
import MyTasks from '../components/MyTasks';
import Dashboard from '../components/Dashboard';
// import Profile      from '../components/Profile';
// import Subscriptions from '../components/Subscriptions';
// import Reviews      from '../components/Reviews';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            // { path: 'profile', element: <PrivateRoute><Profile /></PrivateRoute> },
            { path: 'add', element: <PrivateRoute><AddTask /></PrivateRoute> },
            { path: 'browse', element: <BrowseTasks /> },
            {
                path: 'browse/:id',
                element: <PrivateRoute><ViewDetails /></PrivateRoute>,
                loader: async ({ params }) => {
                    try {
                        const res = await fetch(`https://giggy-server.vercel.app/tasks/${params.id}`);
                        if (!res.ok) throw new Response('Not Found', { status: 404 });
                        const data = await res.json();
                        if (!data || Object.keys(data).length === 0) throw new Response('Not Found', { status: 404 });
                        return data;
                    } catch {
                        throw new Response('Not Found', { status: 404 });
                    }
                }
            },
            { path: 'mytasks', element: <PrivateRoute><MyTasks /></PrivateRoute> },
            { path: 'dashboard', element: <PrivateRoute><Dashboard /></PrivateRoute> },

            // { 
            //   path: 'add/:planId',
            //   element: <PrivateRoute><ViewDetails /></PrivateRoute>,
            //   loader: async ({ params }) => {
            //     const res = await fetch('/plans.json');
            //     if (!res.ok) throw new Response('Failed to load', { status: 500 });
            //     const plans = await res.json();
            //     const plan = plans.find(p => String(p.id) === params.planId);
            //     if (!plan) throw new Response('Not Found', { status: 404 });
            //     return plan;
            //   },
            // },
            // { path: 'subs', element: <Subscriptions /> },
            // { path: 'review/:planId', element: <Reviews /> },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'forgot', element: <ForgotPass /> },
            // { path: 'register', element: <Register /> },
            // { path: 'forgot',   element: <ForgotPass /> },
        ],
    },
    { path: '*', element: <ErrorPage /> },
]);

export default router;
