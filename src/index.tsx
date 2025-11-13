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
import LoginPage from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import PaymentPage from "./pages/Payment";
import ContentPage from "./pages/Content";
import PlantillaPage from './pages/Plantilla';
import { Provider } from 'react-redux';
import { store } from './store/store';

const router = createBrowserRouter([
    {path: '/', element: <DashboardPage/>},
    {path: '/pagos-online', element: <PaymentPage/>},
    {path: '/dashboard', element: <DashboardPage/>},
    {path: '/client', element: <ClientPage/>},
    {path: '/report', element: <ReportPage/>},
    {path: '/configuration', element: <ConfigurationPage/>},
    {path: '/meter-reading', element: <MeterReadingPage/>},
    {path: '/login', element: <LoginPage/>},
    {path: '/reset-password', element: <ResetPassword/>},
    {path: '/content', element: <ContentPage/>},
    {path: '/plantilla', element: <PlantillaPage/>},
])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
