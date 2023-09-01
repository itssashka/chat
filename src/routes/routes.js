import { Navigate } from "react-router-dom";
import Chats from "../Pages/Chats";
import Auth from "../Pages/Auth";
import Reg from "../components/Reg";
import Login from "../components/Login";

export const privateRoutes = [
    {path: '/chats', element: <Chats/>},
    {path: "*", element: <Navigate to='/chats' replace/>},
]

export const publicRoutes = [
    {path: '/auth/:page', element: <Auth/>},
    {path: "*", element: <Navigate to='/auth/login' replace/>},
]

