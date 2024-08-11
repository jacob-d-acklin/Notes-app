import React, {useEffect, useState} from 'react'
import plus from '../assets/plus.svg'
import axiosClient from "../axiosClient.js";
import ViewNote from "./ViewNote.jsx";
import {useNavigate} from "react-router-dom";

export default function ViewNotes() {
    const [notes, setNotes] = useState(null);
    const [currentNote, setCurrentNote] = useState();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const date = (string) =>{
        const date = string.slice(0,10)
        const number = 5
        return date.substring(number) + "-" + date.substring(0, number - 1)
    }

    const time = (string) =>{
        let time = string.slice(11,16);
        time = time.split(":");
        let hours = Number(time[0]);
        let minutes = Number(time[1]);
        let timeValue;

        if (hours > 0 && hours <= 12) {
            timeValue= "" + hours;
        } else if (hours > 12) {
            timeValue= "" + (hours - 12);
        } else if (hours === 0) {
            timeValue= "12";
        }

        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
        timeValue += (hours >= 12) ? " P.M." : " A.M.";

        return timeValue;
    }


    useEffect(() => {
        axiosClient.get('/viewNotes')
            .then(({data}) => {
                setNotes(data)
                setLoading(false)
            })
    }, []);



    if (loading) return <p>Loading...</p>;
    const redirectToNotes = () => {
        let path = '/note'
        navigate(path);
    }

    return (

        <div className="grid-container">

            {notes < 1 ?
            <div className="createANote" onClick={redirectToNotes} style={{cursor: 'pointer'}}>
                <div style={{height: '75%'}}>
                    <img src={plus} alt="" style={{height: 50, width: 50, marginTop: 50}}/>
                </div>
                <div>Create a note</div>
            </div>
                :

                notes.sort((a,b)  => { return (a.updated_at > b.updated_at) ? -1 : 1 }).map((note, id) => {
                    return (
            <div className="createANote" onClick={()=> {{setShow(true)} setCurrentNote(note)}}  style={{cursor: 'pointer'}} key={id}>
                <div className="createdNoteTitle">
                    {note.title}
                </div>
                <div className="createdNoteBody">
                    <p className="note-body-text">{note.body}</p>
                </div>
                <div className="createdNoteFooter">
                    <p className="text">{date(note.updated_at)}</p>
                    <p style={{color: 'red'}} className="text">{time(note.updated_at)}</p>
                </div>
            </div>

                    )
                })
            }
            <ViewNote onClose={()=> setShow(false)} show={show} currentNote={currentNote} />
        </div>
    )
}
