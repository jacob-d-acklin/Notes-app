import React, {useState, useRef} from 'react'
import {useStateContext} from "../Context/ContextProvider.jsx";
import axiosClient from "../axiosClient.js";
import {Navigate, useNavigate} from "react-router-dom";

export default function NotesInterface() {
    const titleRef = useRef()
    const bodyRef = useRef()

    const [titleInputValue, setTitleInputValue] = useState('')
    const [bodyInputValue, setBodyInputValue] = useState('')
    const [errors, setErrors] = useState(null);

    const titleMaxLength = 30;
    const bodyMaxLength = 1000;
    const handleTitleInputCount = (event) => {
        const newValue = event.target.value;
        if (newValue.length <= titleMaxLength) {
            setTitleInputValue(newValue)
        }
    }

    const handleBodyInputCount = (event) => {
        const newValue = event.target.value;
        if (newValue.length <= bodyMaxLength) {
            setBodyInputValue(newValue)
        }
    }

    const navigate = useNavigate();
    const onSubmit = (event) => {
        event.preventDefault()
        const payload = {
            title: titleRef.current.value,
            body: bodyRef.current.value,
        }

        axiosClient.post('/note', payload)
            .then(({data}) => {
                console.log('note successfully created')
                navigate('/')
            })
            .catch(err => {
                const response = err.response;
                console.log(response)
                if(response && response.status == 422) {
                    if(response.data.errors){
                        setErrors(response.data.errors)
                    }
                }
            })
    }

    return (
        <div className="notes-interface">
            <form action="" onSubmit={onSubmit} className="form-layout">
                <h1 className="title-label">Title</h1>

                {errors && <div className='alert'>
                    {Object.keys(errors).map(key=>
                        <p key={key}>{errors[key][0]}</p>
                    )}
                </div>}


                <div className="title-input-container">
                <input ref={titleRef} type="text" placeholder='What is your note about?' maxLength={30} onChange={handleTitleInputCount}/>
                <p>{titleInputValue.length  + "/" + "30"}</p>
                </div>
                <div className="body-input-container">
                    <h1 className="body-label">Write a note...</h1>
                    <p className="body-label-count">{bodyInputValue.length + "/" + "1000"}</p>
                </div>
                <textarea ref={bodyRef} name="" id="" cols="70" rows="40" placeholder='Start typing...'
                          style={{resize: 'none', overflowY: "scroll", padding: '1rem'}} maxLength={1000} onChange={handleBodyInputCount}>
                </textarea>
                <button className="save-document">Save Document</button>
            </form>
        </div>
    )
}
