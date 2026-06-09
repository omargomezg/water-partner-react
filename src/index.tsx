import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { router } from './routes';
/* 
const router = createBrowserRouter([
  { path: "/", element: <ContentLayout /> },
  { path: "/pagos-online", element: <PaymentPage /> },
  {
    path: "/dashboard",
    element: <ContentLayout />,
    children: [{ path: "", element: <DashboardPage /> }],
  },
  { path: "/client", element: <ClientPage /> },
  { path: "/report", element: <ReportPage /> },
  { path: "/configuration", element: <ConfigurationPage /> },
  { path: "/meter-reading", element: <MeterReadingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    path: "/content",
    element: <ContentLayout />,
    children: [
      { path: "", element: <ContentTable /> },
      { path: "new", element: <ContentForm /> },
      { path: ":permalink/edit", element: <ContentForm /> },
    ],
  },
  { path: "/plantilla", element: <PlantillaPage /> },
]); */

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);

reportWebVitals();
