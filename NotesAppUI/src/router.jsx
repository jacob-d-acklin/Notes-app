import {createBrowserRouter} from "react-router-dom";
import DefaultLayout from "./Components/DefaultLayout.jsx";
import GuestLayout from "./Components/GuestLayout.jsx";
import Login from "./Views/Login.jsx";
import Signup from "./Views/Signup.jsx";
import NotesInterface from "./Views/NotesInterface.jsx";
import ViewNotes from "./Views/ViewNotes.jsx";
import UserProfile from "./Views/UserProfile.jsx";
import NoteEdit from "./Views/NoteEdit.jsx";


const router = createBrowserRouter([

    {
        path: '/',
        element: <DefaultLayout/>,
        children: [

            {
                path: '/',
                element: <ViewNotes/>
            },
            {
                path: '/note',
                element: <NotesInterface/>
            },
            {
                path: '/note/:id',
                element: <NoteEdit/>
            },
            {
                path: `/users/:id` ,
                element: <UserProfile/>
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            }
        ]
    }
])

export default router;
