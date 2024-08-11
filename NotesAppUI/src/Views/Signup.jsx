import React, {useRef, useState} from 'react'
import {Link} from "react-router-dom";
import axiosClient from "../axiosClient.js";
import {useStateContext} from "../Context/ContextProvider.jsx";

export default function Signup() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [errors, setErrors] = useState(null);

    const {setUser,setToken} = useStateContext()

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            Password_Confirmation: passwordConfirmRef.current.value,
        }
        setErrors(null)
        axiosClient.post('/signup', payload)
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
                    <h1>Signup</h1>

                    {errors && <div className='alert'>
                        {Object.keys(errors).map(key =>
                            <p key={key}>{errors[key][0]}</p>
                        )}
                    </div>}
                    <input ref={nameRef} type="text" placeholder="Username"/>
                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <p className="passwordRequirements">Password Requirements: Minimum 8 characters</p>
                    <input ref={passwordConfirmRef} type="password" placeholder="Confirm Password"/>
                    <button>Signup</button>
                    <p className='message'>
                        Already Registered? <Link to="/login">Login to account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
