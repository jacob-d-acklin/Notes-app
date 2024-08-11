import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import axiosClient from "../axiosClient.js";

export default function ViewNote(props) {
    const navigate = useNavigate();

    if (!props.show) {
        return null
    }

    const {currentNote} = props;

    const deleteNote = (currentNote) => {
        console.log(currentNote.id)
        const payload = {
            id: currentNote.id
        }
        if(!window.confirm("Are you sure you want to delete this note?")){
            return
        }
        axiosClient.delete(`/deleteNote/${currentNote.id}`, payload)
            .then(() => {
                window.location.reload()
            })
    }


    return (
        <div className={`modal ${props.show ? 'show' : ''}`} onClick={props.onClose
        }>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <button className='close-Modal-Button' onClick={props.onClose}>Close</button>
                <div className='modal-header'>
                    <h4 className='modal-title'>{currentNote.title}</h4>
                </div>
                <div className='modal-body'>
                    {currentNote.body}
                </div>
                <div className='modal-footer'>
                    <button className='note-btn' onClick={() => {
                        navigate(`/note/${currentNote.id}`, {state: {currentNote}})
                    }}>Edit
                    </button>
                    <button className="note-btn" onClick={()=>deleteNote(currentNote)}>Delete</button>

                </div>
            </div>
        </div>
    )
}
