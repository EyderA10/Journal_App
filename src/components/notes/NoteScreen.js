import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNotes, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes);

    const [values, handleInputChange, reset] = useForm(note);

    const { body, title, id } = values;

    const activeId = useRef(note.id);

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }

    useEffect(() => {

        if (activeId.current !== note.id) {
            reset(note)
            activeId.current = note.id;
            
        }

    }, [note, reset]);

    useEffect(() => {
        
        dispatch(activeNotes(values.id, {...values}));
        
    }, [values, dispatch])

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                    <input
                        type="text"
                        placeholder="Some awesome title"
                        className="notes__title-input"
                        autoComplete="off"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                    />

                    <textarea
                        placeholder="what happened today"
                        className="notes__textarea"
                        name="body"
                        onChange={handleInputChange}
                        value={body}
                    >
                        {body}</textarea>
                {
                    (note.url) &&
                    <div className="notes__image">
                        <img src= {note.url} alt="img" />
                    </div>

                }

            </div>

            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>

        </div>
    )
}
