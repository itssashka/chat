import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes/routes'
import { useSelector } from 'react-redux';
import { getIsAuth } from '../store/userSlice';

const AppRouter = () => {
  const isAuth = useSelector(getIsAuth);
  console.log(isAuth);
  const routes = isAuth ? privateRoutes : publicRoutes;

  return (
    <Routes>
        {routes.map(route => 
            <Route path={route.path} element={route.element} key={route.path}/>
        )}
    </Routes>
  )
}

export default AppRouter