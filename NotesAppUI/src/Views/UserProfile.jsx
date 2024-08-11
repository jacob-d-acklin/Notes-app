import React, {useEffect, useState} from 'react'
import {useStateContext} from "../Context/ContextProvider.jsx";
import axiosClient from "../axiosClient.js";
import {Navigate, useNavigate} from "react-router-dom";

export default function UserProfile() {
    const {user,setUser,token,setToken} = useStateContext()
    const [sumOfNotes, setSumOfNotes] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                console.log(data.id)
                setUser(data)
            })
    }, []);

    const onDelete = (user) => {
        console.log(user)
        if(!window.confirm("Are you sure you want to delete your account?")){
            return
        }

        axiosClient.delete(`/users/${user.id}`)
            .then(()=> {
                setUser({})
                setToken(null)
            });
    if (!token){
        return <Navigate to="/login"/>
    }
    };



    useEffect(() => {
        axiosClient.get('/viewNotes')
            .then(({data}) => {
                setSumOfNotes(data['length']);
                setLoading(false)
            })
    }, []);

    return (
        <>
        <div className="userProfile">
            <div className="credentials">
                <h3>Username: {user.name}</h3>
                <h3>Email: {user.email}</h3>
                <h3>Password: {'*'.repeat(10)}</h3>

            </div>
            <div>
                <h2>Number of Notes: {loading ? "--" : sumOfNotes}</h2>
            </div>
        </div>
    <button className="deleteAccountButton" onClick={() => {onDelete(user)}}>Delete Account</button>
    </>
    )
}
