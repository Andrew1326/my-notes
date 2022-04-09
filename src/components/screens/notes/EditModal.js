import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { editNote } from './notesSlice';
import { useForm } from 'react-hook-form';

export default function EditModal({show, setShow, noteId}) {

    const { handleSubmit, register } = useForm()
    const dispatch = useDispatch()

    const handleClose = () => setShow(false);

    //* submit
    const onSubmit = data => {
        dispatch(editNote({note: data.note, noteId}));
        setShow(false);
    };

    return (
        <Modal show={show} onHide={handleClose} style={{color: '#212529'}}> 
            <Modal.Header closeButton>
                <Modal.Title>Note editing:</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
                <Form.Label>Changes</Form.Label>
                <Form.Control 
                autoFocus
                style={{textAlign: 'center'}}
                type='text'
                placeholder='Enter you changes here...'
                {...register('note')}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>close</Button>
                <Button variant='primary' type='submit'>save changes</Button>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}