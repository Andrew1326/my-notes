import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createNote } from './notesSlice';
import { useDispatch } from 'react-redux';

export default function CreateNote() {

    const [note, setNote] = useState('')

    const dispatch = useDispatch()

    //* change
    const handleChange = e => setNote(e.target.value);

    //* submit
    const handleSubmit = e => {
        e.preventDefault();

        dispatch(createNote(note));
        setNote('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Control 
            value={note}
            onChange={handleChange}
            style={{textAlign: 'center'}} 
            placeholder='Enter note or task...' 
            />
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2%'}}>
                <Button variant='success' type='submit'>create note</Button>
            </div>
        </Form>
    )
}