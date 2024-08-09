import { ThemeProvider } from "./context/Themes";
import { LoaderProvider } from "./context/Preloader";
import { BrowserRouter, Routes, Route, Navigate, createBrowserRouter, Outlet, RouterProvider, useNavigate } from "react-router-dom";
import { Overview, Documentation, ChangeLog, Error } from "./pages/supports";
import { Avatars, Alerts, Buttons, Charts, Tables, Fields, Headings, Colors } from "./pages/blocks";
import { Ecommerce, Analytics, CRM, ForgotPassword, Register, Login, UserList, UserProfile, MyAccount, 
    ProductList, ProductView, ProductUpload, OrderList, Message, 
    Notification, BlankPage, Settings, InvoiceList, InvoiceDetails } from "./pages/master";
// import SalesList from "./pages/master/InvoiceList/SalesList";
import NewSales from "./pages/master/NewSales/NewSales";
import { Toaster } from 'react-hot-toast'

import { store } from './redux/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
// import SalesDetails from "./pages/master/InvoiceList/SalesDetails";
import CompleteAccount from "./pages/master/CompleteAccount";
import SalesList from "./pages/master/SalesList/SalesList";
import SalesDetails from "./pages/master/SalesList/SalesDetails";
import { useEffect } from "react";
import { handlePOSLogout } from "./redux/authentication";
import decode from 'jwt-decode'
import MenuList from "./pages/master/Menu/MenuList";
import MenuDetails from "./pages/master/Menu/MenuDetails";
import SalesInvenortyDetails from "./pages/master/SalesInventory/SalesInvenortyDetails";
import SalesInventory from "./pages/master/SalesInventory/SalesInventory";










export default function App() {

    const user = useSelector(state => state.auth.userPOSData)
        
    
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const removeUser = async () => {
        // navigate('/login');
        dispatch(handlePOSLogout());
        if(window){
          window.location.reload()
      }
      }
    
      useEffect(() => {
        const token = localStorage.getItem('auth_pos_token');
        // console.log(token.length)
    
        if (token) {
          const decodedToken = decode(token);
          // console.log(new Date().getTime())
          if (decodedToken?.exp * 1000 < new Date().getTime()) {
            removeUser();
          };
        }
      }, []);


    

 




    // const navigate = useNavigate()





    // useEffect(() => {

    //   if(!user){
    //     navigate('/login')
    //   }

    // }, [user])

    const ProtectedRoute = ({ children }) => {
        if (!user) {
          return <Navigate to="/login" />;
        }
        return children;
    };
    


      const router = createBrowserRouter([
        {
          path: "/",
          element: (
            <ProtectedRoute>
                <Outlet />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "/",
              element: <Ecommerce />,
            },

            {
              path: "/my-account",
              element: <MyAccount />,
            },
            {
              path: "/orders-list",
              element: <SalesList />,
            },
            {
              path: "/new-orders",
              element: <NewSales />,
            },
            {
              path:"/sales-details",
              element: <SalesDetails />,
            },
            {
              path:"/items-list",
              element: <MenuList />,
            },
            {
              path:"/menu-details",
              element: <MenuDetails />,
            },
            {
              path:"/sales-inventory-list",
              element: <SalesInventory />,
            },
            {
              path:"/sales-inventory-details",
              element: <SalesInvenortyDetails />,
            },
            {
              path:"/invoice-list",
              element: <InvoiceList />,
            },
            {
              path:"/invoice-details",
              element: <InvoiceDetails />,
            },
          ],
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword />,
          },
        {
          path: "*",
          element: <Error />,
        },
      ]);






    


    return (
        <ThemeProvider>
            <LoaderProvider>
                <Toaster/>
                <RouterProvider router={router} />
            </LoaderProvider>
        </ThemeProvider>
    );
}

