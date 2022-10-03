import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { createNote } from './notesSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form'

export default function CreateNote() {

    const dispatch = useDispatch()

    const { register, handleSubmit, reset } = useForm()

    //* submit
    const onSubmit = data => {
        dispatch(createNote(data.text));
        reset()
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Control 
            {...register('text')}
            style={{textAlign: 'center'}} 
            placeholder='Enter note or task...' 
            />
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2%'}}>
                <Button variant='success' type='submit'>create note</Button>
            </div>
        </Form>
    )
}