import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Customers from './components/Customers.jsx';
import Trainings from './components/Trainings.jsx';
import Error from './components/Error.jsx'
import Calendar from './components/Calendar.jsx'
//import Home from './components/Home.jsx';

const router = createBrowserRouter([ // Import components that are used in routes
{
path: "/",
element: <App />,
children: [ // children are nested routes with a route
{
element: <Trainings />,
index: true // index route does not need any path
},
{
path: "customers", // path can be defined relative to the parent path
element: <Customers />,
},
{
  path: "Calendar", // path can be defined relative to the parent path
  element: <Calendar />,
  },
],
errorElement: <Error />
}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    <RouterProvider router={router} />
  </React.StrictMode>,
);
