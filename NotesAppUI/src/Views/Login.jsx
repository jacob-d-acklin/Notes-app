import React, {useRef, useState} from 'react'
import {Link} from "react-router-dom";
import {useStateContext} from "../Context/ContextProvider.jsx";
import axiosClient from "../axiosClient.js";

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [errors, setErrors] = useState(null);
    const {setToken, setUser} = useStateContext()

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        setErrors(null)
        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
                console.log(data.user)
            })
            .catch(err => {
                const response = err.response;
                console.log(response)
                if(response && response.status == 422) {
                    if(response.data.errors){
                        setErrors(response.data.errors)
                    }else{
                        setErrors({
                            email:[response.data.message]
                        })
                    }
                }
            })
    }


    return (
        <div className="login-signup-form">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1>Login</h1>

                    {errors && <div className='alert'>
                        {Object.keys(errors).map(key=>
                            <p key={key}>{errors[key][0]}</p>
                        )}
                    </div>}

                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>

                    <button>Login</button>
                    <p className='message'>
                        Not Registered? <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
