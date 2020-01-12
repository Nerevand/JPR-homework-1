import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, path, exact }) => {
    const token = localStorage.getItem('user')
    if(!token) {
        return <Redirect push to="/" />
    }
    return <Route exact={exact} path={path} component={Component} />
}

export default PrivateRoute;