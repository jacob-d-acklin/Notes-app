import {useEffect} from 'react'
import {useStateContext} from "../Context/ContextProvider.jsx";
import axiosClient from "../axiosClient.js";
import {Link, Navigate, Outlet, useLocation} from "react-router-dom";

export default function DefaultLayout() {
    const {token,user,setUser,setToken} = useStateContext()
    const location = useLocation();

    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    }, []);

    if(!token){
        return <Navigate to="/login"/>
    }


    const onLogout = (e) => {
        e.preventDefault();

        axiosClient.post("/logout")
            .then(()=>{
                setUser({})
                setToken(null)

            })
    };

    const headerName = () => {
        const path = location.pathname;

        if(path === "/"){
            return 'View Notes'
        }else if(path === "/note"){
            return 'Note'
        }else if (path === `/users/${user.id}`){
            return 'User Profile'
        }
    }




    return (
        <div id="defaultLayout">
            <aside>
                <Link className="aside-link" to='/'>View Notes</Link>
                <Link className="aside-link" to='/note'>Create a Note</Link>
                <Link className="aside-link" to={`/users/${user.id}`} >User Profile</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        <h3 className="header-name">{headerName()}</h3>
                    </div>
                    <div style={{display:'flex', width: 200, justifyContent:"space-between", alignItems:'center'}}>
                        <div className="username">
                        {user.name}
                        </div>
                        <button  className='btn-logout'>
                        <a href="#" onClick={onLogout}>Logout</a>
                        </button>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
