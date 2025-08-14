import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import DashboardPage from "./pages/Dashboard";
import ClientPage from "./pages/Client";
import ConfigurationPage from "./pages/Configuration";
import ReportPage from "./pages/Report";
import MeterReadingPage from "./pages/MeterReading";

const router = createBrowserRouter([
    {path: '/', element: <DashboardPage/>},
    {path: '/dashboard', element: <DashboardPage/>},
    {path: '/client', element: <ClientPage/>},
    {path: '/report', element: <ReportPage/>},
    {path: '/configuration', element: <ConfigurationPage/>},
    {path: '/meter-reading', element: <MeterReadingPage/>},
])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

reportWebVitals();
