import React, {useState, useEffect, useRef} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import axiosClient from "../axiosClient.js";

export default function NoteEdit() {
    const location = useLocation();
    const {state} = location;
    const navigate = useNavigate();
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const titleRef = useRef();
    const bodyRef = useRef();

    const [titleInputValue, setTitleInputValue] = useState(state.currentNote.title.length)
    const [bodyInputValue, setBodyInputValue] = useState(state.currentNote.body.length)

    const titleMaxLength = 30;
    const bodyMaxLength = 1000;

    const handleTitleInputCount = (event) => {
        const newValue = event.currentTarget.value;
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

    const handleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
    }

    useEffect(() => {
        const titleCountValue = document.getElementById('titleInputValue')
        const bodyCountValue = document.getElementById('bodyInputValue')
        titleCountValue.innerText = titleInputValue.toString() + "/" + "30"
        bodyCountValue.innerText = bodyInputValue.toString() + "/" + "1000"

        // return () => {
        //     setTitleInputValue(titleInputValue)
        // };
    }, []);

    const updateNote = (event) => {
        event.preventDefault()
        const payload = {
            id: state.currentNote.id,
            title: titleRef.current.value,
            body: bodyRef.current.value,
        }

        axiosClient.post('/updateNote', payload)
            .then(({data}) => {
                console.log('note successfully created')
                navigate('/')
            })
    }

    return (
        <div className="notes-interface">
            <form action="" onSubmit={updateNote} className="form-layout">
                <h1 className="title-label">Title</h1>
                <div className="title-input-container">
                    <input ref={titleRef} type="text" placeholder='What is your note about?' maxLength={30}
                           onChange={handleTitleInputCount} defaultValue={state.currentNote.title}/>
                    <p id="titleInputValue">{titleInputValue.length + "/" + "30"}</p>
                </div>
                <div className="body-input-container">
                    <h1 className="body-label">Write a note...</h1>
                    <p id="bodyInputValue" className="body-label-count">{bodyInputValue.length + "/" + "1000"}</p>
                </div>
                <textarea ref={bodyRef} name="" id="" cols="70" rows="40" placeholder='Start typing...'
                          style={{resize: 'none', overflowY: "scroll", padding: '1rem'}} maxLength={1000}
                          onChange={handleBodyInputCount} defaultValue={state.currentNote.body}>
                </textarea>
                <button className="save-document">Save Document</button>
            </form>
        </div>
    )
}
