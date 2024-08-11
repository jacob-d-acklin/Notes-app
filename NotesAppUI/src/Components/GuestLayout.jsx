import React from 'react'
import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../Context/ContextProvider.jsx";

export default function GuestLayout() {
    const {token} = useStateContext()

    if(token){
        return <Navigate to='/'/>
    }

    return (
        <div>
            <h1 className="guestLayout">Welcome to Notes</h1>
            <Outlet/>
        </div>
    )
}
