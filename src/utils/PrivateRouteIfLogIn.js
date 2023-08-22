import React from "react";
import { Navigate, Outlet } from "react-router-dom";
function PrivateRouteIfLogIn() {
    const jwt = localStorage.getItem("jwt");

    return (
        !jwt ? <Outlet /> : <Navigate to="/" /> 

    )
}

export default PrivateRouteIfLogIn;