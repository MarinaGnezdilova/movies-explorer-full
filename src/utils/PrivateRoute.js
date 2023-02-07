import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function PrivateRoute() {
    const jwt = localStorage.getItem("jwt");
    return (
        !jwt ? <Navigate to="/signin" /> : <Outlet />

    )
}

export default PrivateRoute;