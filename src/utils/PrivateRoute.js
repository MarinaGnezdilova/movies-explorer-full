import React from "react";
import { Navigate, Outlet } from "react-router-dom";
function PrivateRoute() {
    const jwt = localStorage.getItem("jwt");
    return (
        !jwt ? <Navigate to="/" /> : <Outlet />

    )
}

export default PrivateRoute;